<!-- search/+page.svelte -->
<script lang="ts">
	import type { Track } from 'types/audius';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { audiusApi } from 'api';
	import SearchBar from 'components/SearchBar.svelte';
	import TrackList from 'components/TrackList.svelte';
	import TrackCardSkeleton from 'components/TrackCardSkeleton.svelte';

	let tracks: Track[] = [];
	let isLoading = false;
	let error: string | null = null;

	// Create an array of 20 undefined elements for skeleton loading
	const skeletonCount = 20;
	const skeletonArray = [...Array(skeletonCount)];

	$: query = $page.url.searchParams.get('q') || '';

	$: {
		if (query) {
			searchTracks(query);
		}
	}

	async function searchTracks(searchQuery: string) {
		isLoading = true;
		error = null;

		try {
			tracks = await audiusApi.searchTracks(searchQuery);
		} catch (e) {
			error = 'Failed to search tracks. Please try again later.';
			console.error(e);
		} finally {
			isLoading = false;
		}
	}

	function handleSearch(event: CustomEvent<string>) {
		const searchQuery = event.detail;
		goto(`/search?q=${encodeURIComponent(searchQuery)}`);
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
	<div class="mb-8">
		<SearchBar value={query} on:search={handleSearch} />
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
	{:else if query}
		<div class="text-white/60">No tracks found for "{query}"</div>
	{/if}
</div>
