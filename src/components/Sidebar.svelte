<script lang="ts">
	import { Home, Music } from 'lucide-svelte';
	import { page } from '$app/stores';

	let sidebarOpen = false;
</script>

<!-- Mobile Hamburger Button -->
<button
	class="fixed top-5 left-4 z-40 text-white md:hidden"
	onclick={() => (sidebarOpen = !sidebarOpen)}
>
	<img src="/logo.png" alt="Ellioptify" class="h-10 w-10" />
</button>

<!-- Mobile Backdrop -->
{#if sidebarOpen}
	<div class="fixed inset-0 z-20 bg-black/50 md:hidden" onclick={() => (sidebarOpen = false)} />
{/if}

<!-- Sidebar -->
<div
	class="fixed top-0 bottom-0 left-0 z-30 flex w-64 transform flex-col bg-black transition-transform duration-300 md:static md:translate-x-0"
	class:translate-x-0={sidebarOpen}
	class:-translate-x-full={!sidebarOpen}
>
	<div class="px-4 py-5">
		<!-- Logo -->
		<div class="mb-10 flex items-center gap-2">
			<img src="/logo.png" alt="Ellioptify" class="h-10 w-10" />
			<h1 class="text-2xl font-bold text-white">Ellioptify</h1>
		</div>

		<!-- Navigation -->
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
