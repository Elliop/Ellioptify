<script lang="ts">
	import type { Track } from 'types/audius';
	import TrackCard from 'components/TrackCard.svelte';
	import { player } from 'stores/player';

	export let tracks: Track[];

	// Set the playlist when tracks change
	$: {
		player.setPlaylist(tracks);
	}
</script>

<div class="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
	{#each tracks as track, index (track.id)}
		<TrackCard {track} {index} />
	{/each}
</div>
