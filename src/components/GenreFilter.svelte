<!-- GenreFilter.svelte -->
<script lang="ts">
	export let selectedGenre: string | null = null;
	export let onGenreSelect: (genre: string | null) => void;

	const genres = [
		'All Genres',
		'Electronic',
		'Rock',
		'Metal',
		'Alternative',
		'Hip-Hop/Rap',
		'Experimental',
		'Punk',
		'Folk',
		'Pop',
		'Ambient',
		'Jazz',
		'Classical',
		'Blues',
		'R&B/Soul',
		'Reggae'
	];

	function handleGenreClick(genre: string) {
		if (genre === 'All Genres') {
			onGenreSelect(null);
		} else {
			onGenreSelect(genre.toLowerCase());
		}
	}
</script>

<div class="mb-6 flex flex-wrap gap-2">
	{#each genres as genre}
		<button
			class="rounded-full px-4 py-2 text-sm font-medium transition-colors {selectedGenre ===
			(genre === 'All Genres' ? null : genre.toLowerCase())
				? 'bg-[#1DB954] text-white'
				: 'bg-white/10 text-white hover:bg-white/20'}"
			on:click={() => handleGenreClick(genre)}
		>
			{genre}
		</button>
	{/each}
</div>
