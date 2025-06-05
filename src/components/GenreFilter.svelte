<script lang="ts">
	import { goto } from '$app/navigation';
	export let selectedGenre: string | null = null;

	interface Genre {
		name: string;
		color: string;
		slug: string;
		image: string;
	}

	const genres: Genre[] = [
		{ name: 'All-Genres', color: 'bg-pink-600', slug: '', image: '/genre/all.jpeg' },
		{
			name: 'Electronic',
			color: 'bg-purple-600',
			slug: 'Electronic',
			image: '/genre/electronic.jpeg'
		},
		{ name: 'Rock', color: 'bg-red-600', slug: 'Rock', image: '/genre/roc.jpeg' },
		{ name: 'Metal', color: 'bg-gray-800', slug: 'Metal', image: '/genre/metal.jpeg' },
		{
			name: 'Alternative',
			color: 'bg-indigo-600',
			slug: 'Alternative',
			image: '/genre/alternative.jpeg'
		},
		{
			name: 'Hip-Hop-Rap',
			color: 'bg-blue-600',
			slug: 'Hip-Hop/Rap',
			image: '/genre/hip-hop-rap.jpeg'
		},
		{
			name: 'Experimental',
			color: 'bg-yellow-600',
			slug: 'Experimental',
			image: '/genre/experimental.jpg'
		},
		{ name: 'Punk', color: 'bg-red-800', slug: 'Punk', image: '/genre/punk.jpeg' },
		{ name: 'Folk', color: 'bg-green-700', slug: 'Folk', image: '/genre/folk.jpeg' },
		{ name: 'Pop', color: 'bg-pink-500', slug: 'Pop', image: '/genre/pop.jpeg' },
		{ name: 'Ambient', color: 'bg-teal-600', slug: 'Ambient', image: '/genre/ambient.jpeg' },
		{
			name: 'Soundtrack',
			color: 'bg-purple-700',
			slug: 'Soundtrack',
			image: '/genre/soundtrack.jpeg'
		},
		{ name: 'World', color: 'bg-blue-700', slug: 'World', image: '/genre/world.jpeg' },
		{ name: 'Jazz', color: 'bg-yellow-700', slug: 'Jazz', image: '/genre/jazz.jpeg' },
		{ name: 'Acoustic', color: 'bg-green-600', slug: 'Acoustic', image: '/genre/acoustic.jpeg' },
		{ name: 'Funk', color: 'bg-orange-600', slug: 'Funk', image: '/genre/funk.jpeg' },
		{
			name: 'Devotional',
			color: 'bg-amber-700',
			slug: 'Devotional',
			image: '/genre/devotional.jpeg'
		},
		{ name: 'Classical', color: 'bg-slate-600', slug: 'Classical', image: '/genre/classical.jpeg' },
		{ name: 'Reggae', color: 'bg-green-800', slug: 'Reggae', image: '/genre/reggae.jpeg' },
		{ name: 'Podcasts', color: 'bg-emerald-700', slug: 'Podcasts', image: '/genre/podcast.jpeg' },
		{ name: 'Country', color: 'bg-amber-600', slug: 'Country', image: '/genre/country.jpeg' },
		{ name: 'R&B-Soul', color: 'bg-slate-700', slug: 'R&B/Soul', image: '/genre/r&b.jpeg' },
		{
			name: 'Spoken-Word',
			color: 'bg-violet-700',
			slug: 'Spoken Word',
			image: '/genre/spoken.jpeg'
		},
		{ name: 'Comedy', color: 'bg-pink-700', slug: 'Comedy', image: '/genre/comedy.jpeg' },
		{ name: 'Blues', color: 'bg-blue-800', slug: 'Blues', image: '/genre/blues.jpeg' },
		{ name: 'Kids', color: 'bg-cyan-600', slug: 'Kids', image: '/genre/kids.jpeg' },
		{
			name: 'Audiobooks',
			color: 'bg-emerald-800',
			slug: 'Audiobooks',
			image: '/genre/audio-book.jpeg'
		},
		{ name: 'Latin', color: 'bg-red-700', slug: 'Latin', image: '/genre/latin.jpeg' },
		{ name: 'Lo-Fi', color: 'bg-purple-800', slug: 'Lo-Fi', image: '/genre/lo-fi.jpeg' },
		{ name: 'Hyperpop', color: 'bg-fuchsia-600', slug: 'Hyperpop', image: '/genre/hyper-pop.jpeg' },
		{ name: 'Dancehall', color: 'bg-orange-700', slug: 'Dancehall', image: '/genre/dancehall.jpeg' }
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
			<h3 class="relative z-10 text-2xl font-bold text-white">{genre.name.replace(/-/g, ' ')}</h3>
			<div class="absolute -right-10 -bottom-16 h-full w-1/2 -rotate-[(-25deg)] overflow-hidden">
				<img
					src={genre.image}
					alt={genre.name}
					class="h-[80%] w-[80%] rounded-md object-cover opacity-90 transition-transform duration-300 group-hover:scale-110"
				/>
			</div>
		</button>
	{/each}
</div>
