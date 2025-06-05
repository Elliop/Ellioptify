<!-- search/+page.svelte -->
<script lang="ts">
	import type { Track } from 'types/audius';
	import { page } from '$app/stores';
	import { audiusApi } from 'api';
	import TrackList from 'components/TrackList.svelte';
	import TrackCardSkeleton from 'components/TrackCardSkeleton.svelte';
	import GenreFilter from 'components/GenreFilter.svelte';

	let tracks: Track[] = [];
	let isLoading = false;
	let error: string | null = null;
	let selectedGenre: string | null = null;

	// Create an array of 20 undefined elements for skeleton loading
	const skeletonCount = 20;
	const skeletonArray = [...Array(skeletonCount)];

	$: query = $page.url.searchParams.get('q') || '';
	$: genre = $page.url.searchParams.get('genre') || null;

	$: {
		if (query || genre) {
			searchTracks(query, genre);
		}
	}

	async function searchTracks(searchQuery: string, genreFilter: string | null) {
		isLoading = true;
		error = null;

		try {
			if (searchQuery) {
				const results = await audiusApi.searchTracks(searchQuery);
				tracks = genreFilter
					? results.filter((track) => track.genre?.toLowerCase() === genreFilter.toLowerCase())
					: results;
			} else if (genreFilter) {
				tracks = await audiusApi.getTrendingTracks({ genre: genreFilter });
			}
		} catch (e) {
			error = 'Failed to search tracks. Please try again later.';
			console.error(e);
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Ellioptify - Search</title>
	<meta
		name="description"
		content="Recherchez des titres de musique sur Ellioptify. Écoutez des titres de qualité et explorez une collection de musique variée."
	/>
</svelte:head>

<div class="space-y-6">
	<GenreFilter selectedGenre={genre} />

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
	{:else if query || genre}
		<div class="text-white/60">
			No tracks found
			{#if query}
				for "{query}"{/if}
			{#if genre}
				in {genre}{/if}
		</div>
	{/if}
</div>
