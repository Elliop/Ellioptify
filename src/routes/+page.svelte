<script lang="ts">
	import type { Track } from 'types/audius';
	import { onMount } from 'svelte';
	import { audiusApi } from 'api';
	import TrackList from 'components/TrackList.svelte';

	let tracks: Track[] = [];
	let isLoading = true;

	onMount(async () => {
		try {
			tracks = await audiusApi.getTrendingTracks();
		} catch (error) {
			console.error('Error fetching tracks:', error);
		} finally {
			isLoading = false;
		}
	});
</script>

<div class="space-y-6">
	<h1 class="text-2xl font-bold text-white">Trending Tracks</h1>

	{#if isLoading}
		<div class="text-white/60">Loading...</div>
	{:else}
		<TrackList {tracks} />
	{/if}
</div>
