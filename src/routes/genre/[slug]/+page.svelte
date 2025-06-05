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
		electronic: 'bg-purple-600',
		rock: 'bg-red-600',
		metal: 'bg-gray-800',
		alternative: 'bg-indigo-600',
		'hip-hop-rap': 'bg-blue-600',
		experimental: 'bg-yellow-600',
		punk: 'bg-red-800',
		folk: 'bg-green-700',
		pop: 'bg-pink-500',
		ambient: 'bg-teal-600',
		soundtrack: 'bg-purple-700',
		world: 'bg-blue-700',
		jazz: 'bg-yellow-700',
		acoustic: 'bg-green-600',
		funk: 'bg-orange-600',
		devotional: 'bg-amber-700',
		classical: 'bg-slate-700',
		reggae: 'bg-green-800',
		podcasts: 'bg-emerald-700',
		country: 'bg-amber-600',
		'spoken-word': 'bg-violet-700',
		comedy: 'bg-pink-700',
		blues: 'bg-blue-800',
		kids: 'bg-cyan-600',
		audiobooks: 'bg-emerald-800',
		latin: 'bg-red-700',
		'lo-fi': 'bg-purple-800',
		hyperpop: 'bg-fuchsia-600',
		dancehall: 'bg-orange-700'
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
