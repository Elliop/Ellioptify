import axios from 'axios';
import type { SearchResults, TrendingResults, Track } from '../types/jamendo';

const JAMENDO_API = 'https://api.jamendo.com/v3.0';
const CLIENT_ID = '201b5d9b'; // TODO: Replace with your client ID from https://developer.jamendo.com/

const getBaseParams = () => ({
	client_id: CLIENT_ID,
	format: 'json',
	include: 'musicinfo', // Include additional track information
	audioformat: 'mp32' // Use mp32 for better compatibility
});

// Helper function to ensure track has proper streaming URL
const processTrackResponse = (track: Track): Track => {
	// Ensure the audio URL has the required streaming parameters
	const audioUrl = new URL(track.audio);
	audioUrl.searchParams.set('format', 'mp32');
	return {
		...track,
		audio: audioUrl.toString()
	};
};

export const jamendoApi = {
	async getTrendingTracks(limit: number = 50, genre?: string): Promise<Track[]> {
		const params = new URLSearchParams({
			...getBaseParams(),
			limit: limit.toString(),
			...(genre && { tags: genre }),
			order: 'popularity_total'
		});

		const response = await axios.get<TrendingResults>(`${JAMENDO_API}/tracks/?${params}`);
		return response.data.results.map(processTrackResponse);
	},

	async searchTracks(query: string): Promise<Track[]> {
		const params = new URLSearchParams({
			...getBaseParams(),
			search: query,
			limit: '20'
		});

		const response = await axios.get<SearchResults>(`${JAMENDO_API}/tracks/?${params}`);
		return response.data.results.map(processTrackResponse);
	},

	async getTrackById(trackId: string): Promise<Track> {
		const params = new URLSearchParams({
			...getBaseParams(),
			id: trackId
		});

		const response = await axios.get<SearchResults>(`${JAMENDO_API}/tracks/?${params}`);

		if (response.data.results.length === 0) {
			throw new Error('Track not found');
		}

		return processTrackResponse(response.data.results[0]);
	}
};
