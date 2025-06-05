<script lang="ts">
	import { Home, Music, Search } from 'lucide-svelte';
	import { page } from '$app/stores';
</script>

<div class="fixed top-0 bottom-0 left-0 z-30 flex w-64 flex-col bg-black">
	<div class="p-6">
		<div class="mb-8 flex items-center gap-2">
			<img src="/logo.png" alt="Ellioptify" class="h-10 w-10" />
			<h1 class="text-2xl font-bold text-white">Ellioptify</h1>
		</div>

		<nav class="space-y-2">
			<a
				href="/"
				class="flex items-center gap-4 rounded-md px-3 py-2 text-white/60 transition-colors hover:text-white {$page
					.url.pathname === '/'
					? 'bg-white/10 text-white'
					: ''}"
			>
				<Home class="h-6 w-6" />
				<span class="font-medium">Home</span>
			</a>
			<a
				href="/search"
				class="flex items-center gap-4 rounded-md px-3 py-2 text-white/60 transition-colors hover:text-white {$page
					.url.pathname === '/search'
					? 'bg-white/10 text-white'
					: ''}"
			>
				<Music class="h-6 w-6" />
				<span class="font-medium">Browse</span>
			</a>
		</nav>
	</div>
</div>

<!-- Add padding to main content to account for sidebar -->
<div class="pl-64"></div>
