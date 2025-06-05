<script lang="ts">
	import type { Track } from '../../../types/audius';
	import { page } from '$app/stores';
	import { audiusApi } from '../../../api';
	import TrackList from '../../../components/TrackList.svelte';
	import TrackCardSkeleton from '../../../components/TrackCardSkeleton.svelte';

	let tracks: Track[] = [];
	let isLoading = true;
	let error: string | null = null;

	// Create an array of 20 undefined elements for skeleton loading
	const skeletonCount = 20;
	const skeletonArray = [...Array(skeletonCount)];

	// Genre color mapping
	const genreColors: Record<string, string> = {
		'All-Genres': 'bg-gradient-to-b from-pink-500 to-pink-700',
		Electronic: 'bg-gradient-to-b from-purple-500 to-purple-700',
		Rock: 'bg-gradient-to-b from-red-500 to-red-700',
		Metal: 'bg-gradient-to-b from-gray-700 to-gray-900',
		Alternative: 'bg-gradient-to-b from-indigo-500 to-indigo-700',
		'Hip-Hop-Rap': 'bg-gradient-to-b from-blue-500 to-blue-700',
		Experimental: 'bg-gradient-to-b from-yellow-500 to-yellow-700',
		Punk: 'bg-gradient-to-b from-red-700 to-red-900',
		Folk: 'bg-gradient-to-b from-green-600 to-green-800',
		Pop: 'bg-gradient-to-b from-pink-400 to-pink-600',
		Ambient: 'bg-gradient-to-b from-teal-500 to-teal-700',
		Soundtrack: 'bg-gradient-to-b from-purple-600 to-purple-800',
		World: 'bg-gradient-to-b from-blue-600 to-blue-800',
		Jazz: 'bg-gradient-to-b from-yellow-600 to-yellow-800',
		Acoustic: 'bg-gradient-to-b from-green-500 to-green-700',
		Funk: 'bg-gradient-to-b from-orange-500 to-orange-700',
		Devotional: 'bg-gradient-to-b from-amber-600 to-amber-800',
		Classical: 'bg-gradient-to-b from-slate-500 to-slate-700',
		Reggae: 'bg-gradient-to-b from-green-700 to-green-900',
		Podcasts: 'bg-gradient-to-b from-emerald-600 to-emerald-800',
		Country: 'bg-gradient-to-b from-amber-500 to-amber-700',
		'R&B-Soul': 'bg-gradient-to-b from-slate-600 to-slate-800',
		'Spoken-Word': 'bg-gradient-to-b from-violet-600 to-violet-800',
		Comedy: 'bg-gradient-to-b from-pink-600 to-pink-800',
		Blues: 'bg-gradient-to-b from-blue-700 to-blue-900',
		Kids: 'bg-gradient-to-b from-cyan-500 to-cyan-700',
		Audiobooks: 'bg-gradient-to-b from-emerald-700 to-emerald-900',
		Latin: 'bg-gradient-to-b from-red-600 to-red-800',
		'Lo-Fi': 'bg-gradient-to-b from-purple-700 to-purple-900',
		Hyperpop: 'bg-gradient-to-b from-fuchsia-500 to-fuchsia-700',
		Dancehall: 'bg-gradient-to-b from-orange-600 to-orange-800'
	};

	$: genre = $page.params.slug;
	$: genreColor = genreColors[genre] || 'bg-gray-800';
	$: genreName = genre
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

	$: {
		if (genre) {
			loadGenreTracks(genre);
		}
	}

	async function loadGenreTracks(genre: string) {
		isLoading = true;
		error = null;

		try {
			if (genreName === 'All Genres') {
				tracks = await audiusApi.getTrendingTracks();
			} else if (genreName === 'Hip Hop Rap') {
				tracks = await audiusApi.getTrendingTracks({ genre: 'Hip-Hop/Rap' });
			} else if (genreName === 'R&B Soul') {
				tracks = await audiusApi.getTrendingTracks({ genre: 'R&B/Soul' });
			} else {
				tracks = await audiusApi.getTrendingTracks({ genre: genreName });
			}
		} catch (e) {
			error = 'Failed to load tracks. Please try again later.';
			console.error(e);
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Ellioptify - {genreName}</title>
	<meta
		name="description"
		content="Découvrez les meilleurs titres de {genreName} sur Ellioptify. Écoutez des titres de qualité et explorez une collection de musique variée."
	/>
</svelte:head>

<div class="space-y-6">
	<div class="{genreColor} -mx-4 -mt-4 mb-8 p-8 sm:-mx-8 sm:p-12">
		<h1 class="text-4xl font-bold text-white sm:text-5xl">{genreName}</h1>
		<p class="mt-2 text-lg text-white/80">Trending in {genreName}</p>
	</div>

	{#if isLoading}
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
			{#each skeletonArray as _, i (i)}
				<TrackCardSkeleton />
			{/each}
		</div>
	{:else if error}
		<div class="text-red-500">{error}</div>
	{:else if tracks.length > 0}
		<TrackList {tracks} />
	{:else}
		<div class="text-white/60">No tracks found in {genreName}</div>
	{/if}
</div>
