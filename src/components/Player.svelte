<script lang="ts">
	import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Repeat } from 'lucide-svelte';
	import { onMount, onDestroy } from 'svelte';
	import { player } from 'stores/player';

	let audio: HTMLAudioElement;
	let progressBar: HTMLInputElement;
	let volumeBar: HTMLInputElement;
	let isDraggingProgress = false;
	let currentPlayPromise: Promise<void> | null = null;

	// Setup media session handlers
	function setupMediaSession() {
		if ('mediaSession' in navigator) {
			navigator.mediaSession.setActionHandler('play', () => player.togglePlay());
			navigator.mediaSession.setActionHandler('pause', () => player.togglePlay());
			navigator.mediaSession.setActionHandler('previoustrack', () => player.playPrevious());
			navigator.mediaSession.setActionHandler('nexttrack', () => player.playNext());
		}
	}

	// Update media session metadata when track changes
	$: if ('mediaSession' in navigator && $player.currentTrack) {
		navigator.mediaSession.metadata = new MediaMetadata({
			title: $player.currentTrack.name,
			artist: $player.currentTrack.artist_name,
			artwork: [
				{
					src: $player.currentTrack.image,
					sizes: '480x480',
					type: 'image/jpeg'
				}
			]
		});
	}

	// Handle keyboard events for space bar play/pause
	function handleKeydown(event: KeyboardEvent) {
		// Only handle space if we're not in an input field
		if (
			event.code === 'Space' &&
			!(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)
		) {
			event.preventDefault();
			player.togglePlay();
		}
	}

	// Reactive effect to handle track changes and playback
	$: {
		if (audio && $player.currentTrack) {
			// Scenario 1: The track's audio source needs to be (re)loaded
			// This condition checks if the audio element's current source is different from the desired track's audio URL.
			if (audio.src !== $player.currentTrack.audio) {
				console.log('Track source changed. Loading track:', $player.currentTrack.name);
				console.log('Audio URL:', $player.currentTrack.audio);
				const newAudioSrc = $player.currentTrack.audio;

				const loadAndPotentiallyPlayTrack = async () => {
					// If there's an ongoing play promise from a previous track/operation,
					// pause audio to help abort it. The promise itself should have a .catch for AbortError.
					if (currentPlayPromise) {
						audio.pause(); // Helps ensure the old promise is aborted.
						// Don't await the old promise; let it abort in the background.
						// Its own .catch handler should manage AbortError.
						// Add a safety catch here in case the original promise didn't have one.
						currentPlayPromise.catch(() => {
							/* Previous play promise aborted */
						});
						currentPlayPromise = null;
					}

					// Reset audio element for the new track
					audio.pause();
					audio.currentTime = 0;
					audio.src = newAudioSrc; // Set the new source

					audio.onerror = (e) => {
						console.error('Audio error:', e);
						console.error('Error code:', audio.error?.code);
						console.error('Error message:', audio.error?.message);
						// If the error is for the current track we just tried to load
						if (audio.src === newAudioSrc && $player.currentTrack?.audio === newAudioSrc) {
							player.reset(); // Or a more specific error handling in the store
						}
					};

					audio.onloadedmetadata = () => {
						console.log('Audio metadata loaded, duration:', audio.duration);
						// Duration is already set in the store from track.duration when playTrack is called.
						// If $player.isPlaying is true, the play attempt will be made below.
					};

					// If the player state indicates it should be playing, attempt to play the new track
					if ($player.isPlaying) {
						console.log('Attempting to play new track:', $player.currentTrack.name);
						currentPlayPromise = audio.play();
						try {
							await currentPlayPromise;
							console.log('Playback started for new track.');
						} catch (error) {
							if (error instanceof Error && error.name !== 'AbortError') {
								console.error('Playback failed (new track):', error);
								// If play fails for the new track, and we are still on this track and supposed to be playing
								if ($player.isPlaying && $player.currentTrack?.audio === newAudioSrc) {
									player.togglePlay(); // Set isPlaying to false in the store
								}
							}
						} finally {
							// The promise has settled (resolved or rejected).
							currentPlayPromise = null;
						}
					}
				};
				loadAndPotentiallyPlayTrack();
			} else {
				// Scenario 2: Track is the same (audio.src is correct). Handle play/pause based on $player.isPlaying.
				if ($player.isPlaying && audio.paused) {
					console.log('Resuming/Starting play for current track:', $player.currentTrack.name);
					const playPromise = audio.play(); // audio.play() returns a promise
					currentPlayPromise = playPromise; // Store the promise to manage it
					playPromise
						.then(() => {
							console.log('Playback resumed/continued.');
						})
						.catch((error) => {
							if (error.name !== 'AbortError') {
								// Ignore AbortError (e.g., if paused quickly after play)
								console.error('Playback failed (resume/toggle):', error);
								// If still supposed to be playing this track, toggle state to paused
								if ($player.isPlaying && $player.currentTrack?.audio === audio.src) {
									player.togglePlay();
								}
							}
						})
						.finally(() => {
							// Clear the promise if it's the one we just handled
							if (currentPlayPromise === playPromise) currentPlayPromise = null;
						});
				} else if (!$player.isPlaying && !audio.paused) {
					console.log('Pausing current track:', $player.currentTrack.name);
					audio.pause();
					// If currentPlayPromise was active for a play() call,
					// audio.pause() will typically cause it to reject with AbortError.
					// The .catch on its assignment should handle this.
				}
			}
		} else if (audio && !$player.currentTrack) {
			// Scenario 3: No current track is selected, or track was cleared.
			// Ensure audio is paused and source is cleared.
			if (audio.src !== '') {
				// Only act if src is currently set
				console.log('No current track. Pausing and clearing audio source.');
				audio.pause();
				audio.src = ''; // Clear the source
				if (currentPlayPromise) {
					// Suppress any unhandled rejection from aborting a previous play promise
					currentPlayPromise.catch(() => {});
					currentPlayPromise = null;
				}
			}
		}
	}

	onMount(() => {
		audio.volume = $player.volume;
		setupMediaSession();
		// Add keyboard event listener
		window.addEventListener('keydown', handleKeydown);
	});

	onDestroy(() => {
		if (audio) {
			audio.pause();
			audio.src = '';
		}
		// Remove keyboard event listener
		window.removeEventListener('keydown', handleKeydown);
	});

	function handleTimeUpdate() {
		if (!isDraggingProgress) {
			player.setProgress(audio.currentTime);
		}
	}

	function handleProgressChange() {
		if (audio && progressBar) {
			audio.currentTime = Number(progressBar.value);
			player.setProgress(audio.currentTime);
		}
	}

	function handleVolumeChange() {
		if (audio && volumeBar) {
			const volume = Number(volumeBar.value);
			audio.volume = volume;
			player.setVolume(volume);
		}
	}

	function toggleMute() {
		if (audio) {
			if (audio.volume > 0) {
				audio.volume = 0;
				player.setVolume(0);
			} else {
				audio.volume = 1;
				player.setVolume(1);
			}
		}
	}

	function formatTime(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}

	function handleTrackEnd() {
		player.playNext();
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="fixed right-0 bottom-0 left-0 border-t border-white/10 bg-[#181818] px-4 py-3">
	<audio bind:this={audio} on:timeupdate={handleTimeUpdate} on:ended={handleTrackEnd}></audio>

	{#if $player.currentTrack}
		<div class="flex items-center gap-4">
			<!-- Track Info -->
			<div class="flex w-[30%] items-center gap-3">
				<img
					src={$player.currentTrack.image}
					alt={$player.currentTrack.name}
					class="h-14 w-14 rounded shadow-lg"
				/>
				<div class="min-w-0">
					<h3 class="truncate text-sm font-medium text-white">
						{$player.currentTrack.name}
					</h3>
					<p class="truncate text-xs text-white/60">
						{$player.currentTrack.artist_name}
					</p>
				</div>
			</div>

			<!-- Player Controls -->
			<div class="flex flex-1 flex-col items-center gap-2">
				<div class="flex items-center gap-4">
					<button
						class="cursor-pointer p-2 text-white/60 transition-colors hover:text-white"
						on:click={() => player.playPrevious()}
						disabled={$player.playlist.length === 0}
					>
						<SkipBack class="h-5 w-5" />
					</button>
					<button
						class="cursor-pointer p-2 text-white transition-colors hover:text-white/80"
						on:click={() => player.togglePlay()}
					>
						{#if $player.isPlaying}
							<Pause class="h-8 w-8" />
						{:else}
							<Play class="h-8 w-8" />
						{/if}
					</button>
					<button
						class="cursor-pointer p-2 text-white/60 transition-colors hover:text-white"
						on:click={() => player.playNext()}
						disabled={$player.playlist.length === 0}
					>
						<SkipForward class="h-5 w-5" />
					</button>
					<button
						class="cursor-pointer p-2 {$player.repeat
							? 'text-green-500'
							: 'text-white/60'} transition-colors hover:text-white"
						on:click={() => player.toggleRepeat()}
						title={$player.repeat ? 'Repeat is on' : 'Repeat is off'}
					>
						<Repeat class="h-5 w-5" />
					</button>
				</div>

				<div class="flex w-full items-center gap-2">
					<span class="w-10 text-right text-xs text-white/60">
						{formatTime($player.progress)}
					</span>
					<input
						bind:this={progressBar}
						type="range"
						min="0"
						max={$player.duration}
						value={$player.progress}
						on:change={handleProgressChange}
						on:mousedown={() => (isDraggingProgress = true)}
						on:mouseup={() => (isDraggingProgress = false)}
						class="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/20 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
					/>
					<span class="w-10 text-xs text-white/60">
						{formatTime($player.duration)}
					</span>
				</div>
			</div>

			<!-- Volume Control -->
			<div class="flex w-[30%] items-center justify-end gap-2">
				<button
					class="cursor-pointer p-1 text-white/60 transition-colors hover:text-white"
					on:click={toggleMute}
				>
					{#if $player.volume > 0}
						<Volume2 class="h-5 w-5" />
					{:else}
						<VolumeX class="h-5 w-5" />
					{/if}
				</button>
				<input
					bind:this={volumeBar}
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={$player.volume}
					on:input={handleVolumeChange}
					class="h-1 w-24 cursor-pointer appearance-none rounded-full bg-white/20 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
				/>
			</div>
		</div>
	{/if}
</div>
