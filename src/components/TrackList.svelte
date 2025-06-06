<script lang="ts">
	import type { Track } from 'types/audius';
	import TrackCard from 'components/TrackCard.svelte';

	export let tracks: Track[];
</script>

<div class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
	{#each tracks as track (track.id)}
		<TrackCard {track} />
	{/each}
</div>
