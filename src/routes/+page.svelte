<script lang="ts">
	import type { Track } from '../types/audius';
	import { onMount } from 'svelte';
	import { audiusApi } from '../api';
	import TrackList from '../components/TrackList.svelte';
	import TrackCardSkeleton from '../components/TrackCardSkeleton.svelte';
	import SearchBar from '../components/SearchBar.svelte';

	let tracks: Track[] = [];
	let isLoading = true;
	let searchQuery = '';

	// Create an array of 20 undefined elements for skeleton loading
	const skeletonCount = 20;
	const skeletonArray = [...Array(skeletonCount)];

	onMount(async () => {
		try {
			tracks = await audiusApi.getTrendingTracks();
		} catch (error) {
			console.error('Error fetching tracks:', error);
		} finally {
			isLoading = false;
		}
	});

	async function handleSearch(event: CustomEvent<string>) {
		const query = event.detail;
		if (!query.trim()) {
			// If search is empty, show trending tracks
			isLoading = true;
			try {
				tracks = await audiusApi.getTrendingTracks();
			} catch (error) {
				console.error('Error fetching tracks:', error);
			} finally {
				isLoading = false;
			}
			return;
		}

		isLoading = true;
		try {
			tracks = await audiusApi.searchTracks(query);
		} catch (error) {
			console.error('Error searching tracks:', error);
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Ellioptify - Home</title>
	<meta
		name="description"
		content="Découvrez les meilleurs titres de musique sur Ellioptify. Écoutez des titres de qualité et explorez une collection de musique variée."
	/>
</svelte:head>

<div class="space-y-6">
	<div class="mb-8">
		<SearchBar value={searchQuery} on:search={handleSearch} />
	</div>

	<h1 class="text-2xl font-bold text-white">
		{#if searchQuery}
			Search Results
		{:else}
			Trending Tracks
		{/if}
	</h1>

	{#if isLoading}
		<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
			{#each skeletonArray as _, i (i)}
				<TrackCardSkeleton />
			{/each}
		</div>
	{:else if tracks.length === 0}
		<div class="text-white/60">
			No tracks found{#if searchQuery}
				for "{searchQuery}"{/if}
		</div>
	{:else}
		<TrackList {tracks} />
	{/if}
</div>
