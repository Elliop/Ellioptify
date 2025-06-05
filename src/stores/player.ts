import { writable } from 'svelte/store';
import type { Track } from '../types/jamendo';

export interface PlayerState {
	currentTrack: Track | null;
	isPlaying: boolean;
	progress: number;
	duration: number;
	volume: number;
}

const initialState: PlayerState = {
	currentTrack: null,
	isPlaying: false,
	progress: 0,
	duration: 0,
	volume: 1
};

function createPlayerStore() {
	const { subscribe, set, update } = writable<PlayerState>(initialState);

	return {
		subscribe,
		playTrack: (track: Track) => {
			update((state) => ({
				...state,
				currentTrack: track,
				isPlaying: true,
				progress: 0,
				duration: track.duration
			}));
		},
		togglePlay: () => {
			update((state) => ({
				...state,
				isPlaying: !state.isPlaying
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
		reset: () => set(initialState)
	};
}

export const player = createPlayerStore();
