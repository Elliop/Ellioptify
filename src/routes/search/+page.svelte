<!-- search/+page.svelte -->
<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import SearchBar from '../../components/SearchBar.svelte';
	import TrackList from '../../components/TrackList.svelte';
	import { jamendoApi } from '../../api/jamendo';
	import type { Track } from '../../types/jamendo';

	let tracks: Track[] = [];
	let isLoading = false;
	let error: string | null = null;

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
			tracks = await jamendoApi.searchTracks(searchQuery);
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

<div class="space-y-6">
	<div class="mb-8">
		<SearchBar value={query} on:search={handleSearch} />
	</div>

	{#if isLoading}
		<div class="text-white/60">Loading...</div>
	{:else if error}
		<div class="text-red-500">{error}</div>
	{:else if tracks.length > 0}
		<TrackList {tracks} />
	{:else if query}
		<div class="text-white/60">No tracks found for "{query}"</div>
	{/if}
</div>
