export interface Track {
	id: string;
	name: string;
	duration: number;
	artist_id: string;
	artist_name: string;
	artist_idstr: string;
	album_name: string;
	album_id: string;
	position: number;
	releasedate: string;
	album_image: string;
	audio: string;
	audiodownload: string;
	prourl: string;
	shorturl: string;
	shareurl: string;
	image: string;
	audiodownload_allowed: boolean;
}

export interface Artist {
	id: string;
	name: string;
	website: string;
	joindate: string;
	image: string;
	shorturl: string;
	shareurl: string;
}

export interface TrendingResults {
	headers: {
		status: string;
		code: number;
		error_message: string;
		warnings: string;
		results_count: number;
	};
	results: Track[];
}

export interface SearchResults {
	headers: {
		status: string;
		code: number;
		error_message: string;
		warnings: string;
		results_count: number;
	};
	results: Track[];
}
