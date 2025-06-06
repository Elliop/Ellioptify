import type { Track } from 'types/audius';
import { writable } from 'svelte/store';

export interface PlayerState {
	currentTrack: Track | null;
	isPlaying: boolean;
	progress: number;
	duration: number;
	volume: number;
	playlist: Track[];
	currentTrackIndex: number;
	repeat: boolean;
}

const initialState: PlayerState = {
	currentTrack: null,
	isPlaying: false,
	progress: 0,
	duration: 0,
	volume: 1,
	playlist: [],
	currentTrackIndex: -1,
	repeat: false
};

function createPlayerStore() {
	const { subscribe, set, update } = writable<PlayerState>(initialState);

	return {
		subscribe,
		setPlaylist: (tracks: Track[]) => {
			update((state) => ({
				...state,
				playlist: tracks,
				currentTrackIndex: -1 // Reset index when new playlist is set
			}));
		},
		playTrack: (track: Track, trackIndex: number = -1) => {
			update((state) => ({
				...state,
				currentTrack: track,
				isPlaying: true,
				progress: 0,
				duration: track.duration,
				currentTrackIndex: trackIndex !== -1 ? trackIndex : state.currentTrackIndex
			}));
		},
		togglePlay: () => {
			update((state) => ({
				...state,
				isPlaying: !state.isPlaying
			}));
		},
		toggleRepeat: () => {
			update((state) => ({
				...state,
				repeat: !state.repeat
			}));
		},
		setProgress: (progress: number) => {
			update((state) => ({
				...state,
				progress
			}));
		},
		setVolume: (volume: number) => {
			update((state) => ({
				...state,
				volume: Math.max(0, Math.min(1, volume))
			}));
		},
		playNext: () => {
			update((state) => {
				if (state.repeat && state.currentTrack) {
					// If repeat is on, replay the current track
					return {
						...state,
						progress: 0,
						isPlaying: true
					};
				}

				if (state.playlist.length === 0 || state.currentTrackIndex === -1) {
					return state;
				}

				const nextIndex = (state.currentTrackIndex + 1) % state.playlist.length;
				const nextTrack = state.playlist[nextIndex];

				return {
					...state,
					currentTrack: nextTrack,
					currentTrackIndex: nextIndex,
					isPlaying: true,
					progress: 0,
					duration: nextTrack.duration
				};
			});
		},
		playPrevious: () => {
			update((state) => {
				if (state.playlist.length === 0 || state.currentTrackIndex === -1) {
					return state;
				}

				const prevIndex =
					state.currentTrackIndex > 0 ? state.currentTrackIndex - 1 : state.playlist.length - 1;
				const prevTrack = state.playlist[prevIndex];

				return {
					...state,
					currentTrack: prevTrack,
					currentTrackIndex: prevIndex,
					isPlaying: true,
					progress: 0,
					duration: prevTrack.duration
				};
			});
		},
		reset: () => set(initialState)
	};
}

export const player = createPlayerStore();
