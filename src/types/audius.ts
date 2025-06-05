export interface AudiusArtwork {
	'150x150': string;
	'480x480': string;
	'1000x1000': string;
}

export interface AudiusUser {
	album_count: number;
	artist_pick_track_id: string;
	bio: string;
	handle: string;
	id: string;
	is_verified: boolean;
	location: string;
	name: string;
	profile_picture: AudiusArtwork;
}

export interface AudiusTrack {
	id: string;
	title: string;
	user: {
		id: string;
		name: string;
		handle: string;
		avatar?: {
			'150x150': string;
			'480x480': string;
			'1000x1000': string;
		};
	};
	duration: number;
	artwork: {
		'150x150': string;
		'480x480': string;
		'1000x1000': string;
	};
	genre?: string;
	mood?: string;
	tags?: string[];
	release_date?: string;
	play_count: number;
	permalink: string;
	description?: string;
	license?: string;
	isrc?: string;
	track_segments?: Array<{
		duration: number;
		multihash: string;
	}>;
}

// Convert Audius track to our app's Track interface
export interface Track {
	id: string;
	name: string;
	duration: number;
	artist_name: string;
	image: string;
	audio: string;
	genre?: string;
}

export interface AudiusResponse {
	data: AudiusTrack;
}

export interface AudiusSearchResponse {
	data: AudiusTrack[];
}
