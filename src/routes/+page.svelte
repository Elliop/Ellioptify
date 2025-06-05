<script lang="ts">
	import { onMount } from 'svelte';
	import TrackList from '../components/TrackList.svelte';
	import { jamendoApi } from '../api/jamendo';
	import type { Track } from '../types/jamendo';

	let tracks: Track[] = [];
	let isLoading = true;

	onMount(async () => {
		try {
			tracks = await jamendoApi.getTrendingTracks();
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
