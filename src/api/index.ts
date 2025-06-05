import axios from 'axios';
import type { AudiusTrack, AudiusResponse, AudiusSearchResponse, Track } from '../types/audius';

const AUDIUS_API = 'https://discoveryprovider.audius.co/v1';
const APP_NAME = 'Music';

const getBaseParams = () => ({
	app_name: APP_NAME
});

// Convert Audius track to our app's Track format
const convertAudiusTrack = (audiusTrack: AudiusTrack): Track => {
	return {
		id: audiusTrack.id,
		name: audiusTrack.title,
		duration: audiusTrack.duration,
		artist_name: audiusTrack.user.name,
		image: audiusTrack.artwork['480x480'],
		audio: `${AUDIUS_API}/tracks/${audiusTrack.id}/stream?${new URLSearchParams(getBaseParams())}`,
		genre: audiusTrack.genre || ''
	};
};

interface GetTrendingTracksOptions {
	genre?: string;
	limit?: number;
}

export const audiusApi = {
	async getTrendingTracks(options: GetTrendingTracksOptions = {}): Promise<Track[]> {
		const { genre, limit = 50 } = options;
		const params = new URLSearchParams({
			...getBaseParams(),
			limit: limit.toString()
		});

		if (genre) {
			params.append('genre', genre);
		}

		const response = await axios.get<AudiusSearchResponse>(
			`${AUDIUS_API}/tracks/trending?${params}`
		);
		return response.data.data.map(convertAudiusTrack);
	},

	async searchTracks(query: string, genre?: string): Promise<Track[]> {
		const params = new URLSearchParams({
			...getBaseParams(),
			query
		});

		const response = await axios.get<AudiusSearchResponse>(`${AUDIUS_API}/tracks/search?${params}`);
		const tracks = response.data.data.map(convertAudiusTrack);

		// Filter by genre if specified
		if (genre) {
			return tracks.filter((track) => track.genre?.toLowerCase() === genre.toLowerCase());
		}

		return tracks;
	},

	async getTrackById(trackId: string): Promise<Track> {
		const params = new URLSearchParams(getBaseParams());

		const response = await axios.get<AudiusResponse>(`${AUDIUS_API}/tracks/${trackId}?${params}`);

		if (!response.data.data) {
			throw new Error('Track not found');
		}

		return convertAudiusTrack(response.data.data);
	},

	getStreamUrl(trackId: string): string {
		const params = new URLSearchParams(getBaseParams());
		return `${AUDIUS_API}/tracks/${trackId}/stream?${params}`;
	}
};
