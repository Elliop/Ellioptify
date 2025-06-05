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
	artwork: AudiusArtwork;
	description: string;
	genre: string;
	id: string;
	mood: string;
	release_date: string;
	title: string;
	user: AudiusUser;
	duration: number;
	play_count: number;
	favorite_count: number;
	tags: string;
}

// Convert Audius track to our app's Track interface
export interface Track {
	id: string;
	name: string;
	duration: number;
	artist_name: string;
	image: string;
	audio: string;
}

export interface AudiusResponse {
	data: AudiusTrack;
}

export interface AudiusSearchResponse {
	data: AudiusTrack[];
}
