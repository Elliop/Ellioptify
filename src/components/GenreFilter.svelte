<script lang="ts">
	import { goto } from '$app/navigation';
	export let selectedGenre: string | null = null;

	interface Genre {
		name: string;
		color: string;
		slug: string;
	}

	const genres: Genre[] = [
		{ name: 'All-Genres', color: 'bg-pink-600', slug: '' },
		{ name: 'Electronic', color: 'bg-purple-600', slug: 'Electronic' },
		{ name: 'Rock', color: 'bg-red-600', slug: 'Rock' },
		{ name: 'Metal', color: 'bg-gray-800', slug: 'Metal' },
		{ name: 'Alternative', color: 'bg-indigo-600', slug: 'Alternative' },
		{ name: 'Hip-Hop/Rap', color: 'bg-blue-600', slug: 'Hip-Hop/Rap' },
		{ name: 'Experimental', color: 'bg-yellow-600', slug: 'Experimental' },
		{ name: 'Punk', color: 'bg-red-800', slug: 'Punk' },
		{ name: 'Folk', color: 'bg-green-700', slug: 'Folk' },
		{ name: 'Pop', color: 'bg-pink-500', slug: 'Pop' },
		{ name: 'Ambient', color: 'bg-teal-600', slug: 'Ambient' },
		{ name: 'Soundtrack', color: 'bg-purple-700', slug: 'Soundtrack' },
		{ name: 'World', color: 'bg-blue-700', slug: 'World' },
		{ name: 'Jazz', color: 'bg-yellow-700', slug: 'Jazz' },
		{ name: 'Acoustic', color: 'bg-green-600', slug: 'Acoustic' },
		{ name: 'Funk', color: 'bg-orange-600', slug: 'Funk' },
		{ name: 'Devotional', color: 'bg-amber-700', slug: 'Devotional' },
		{ name: 'Classical', color: 'bg-slate-700', slug: 'Classical' },
		{ name: 'Reggae', color: 'bg-green-800', slug: 'Reggae' },
		{ name: 'Podcasts', color: 'bg-emerald-700', slug: 'Podcasts' },
		{ name: 'Country', color: 'bg-amber-600', slug: 'Country' },
		{ name: 'Spoken-Word', color: 'bg-violet-700', slug: 'Spoken Word' },
		{ name: 'Comedy', color: 'bg-pink-700', slug: 'Comedy' },
		{ name: 'Blues', color: 'bg-blue-800', slug: 'Blues' },
		{ name: 'Kids', color: 'bg-cyan-600', slug: 'Kids' },
		{ name: 'Audiobooks', color: 'bg-emerald-800', slug: 'Audiobooks' },
		{ name: 'Latin', color: 'bg-red-700', slug: 'Latin' },
		{ name: 'Lo-Fi', color: 'bg-purple-800', slug: 'Lo-Fi' },
		{ name: 'Hyperpop', color: 'bg-fuchsia-600', slug: 'Hyperpop' },
		{ name: 'Dancehall', color: 'bg-orange-700', slug: 'Dancehall' }
	];

	function handleGenreClick(genre: Genre) {
		goto(`/genre/${genre.name}`);
	}
</script>

<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
	{#each genres as genre}
		<button
			class="group relative aspect-[1.8/1] cursor-pointer overflow-hidden rounded-lg {genre.color} p-5 text-left transition-transform hover:scale-[1.02] {selectedGenre ===
			genre.slug
				? 'ring-2 ring-white'
				: ''}"
			on:click={() => handleGenreClick(genre)}
		>
			<h3 class="text-2xl font-bold text-white">{genre.name}</h3>
		</button>
	{/each}
</div>
