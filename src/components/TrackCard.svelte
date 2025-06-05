<!-- TrackCard.svelte -->
<script lang="ts">
	import type { Track } from 'types/audius';
	import { player } from 'stores/player';
	import { Play } from 'lucide-svelte';

	export let track: Track;

	function handlePlay() {
		player.playTrack(track);
	}

	function formatDuration(seconds: number): string {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
	}
</script>

<button
	class="group relative flex aspect-square w-full cursor-pointer flex-col overflow-hidden rounded-lg bg-white/5 p-4 transition-colors hover:bg-white/10"
	on:click={handlePlay}
>
	<img src={track.image} alt={track.name} class="aspect-square w-full rounded shadow-lg" />

	<div class="absolute right-0 bottom-0 left-0 flex items-end bg-gradient-to-t from-black/80 p-4">
		<div class="flex-1">
			<h3 class="max-w-[10rem] truncate px-2 text-sm font-medium text-white">
				{track.name}
			</h3>
			<p class="truncate text-xs text-white/60">
				{track.artist_name}
			</p>
		</div>
		<div class="ml-4 flex items-center">
			<span class="mr-2 text-xs text-white/60">{formatDuration(track.duration)}</span>
			<div
				class="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-black opacity-0 transition-opacity group-hover:opacity-100"
			>
				<Play class="h-5 w-5" />
			</div>
		</div>
	</div>
</button>
