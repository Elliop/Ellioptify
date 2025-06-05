<!-- Sidebar.svelte -->
<script lang="ts">
	import { Home, Search } from 'lucide-svelte';
	import { page } from '$app/stores';
</script>

<div class="fixed top-0 bottom-0 left-0 z-30 flex w-64 flex-col bg-black">
	<div class="p-6">
		<h1 class="mb-8 text-2xl font-bold text-white">Audius Clone</h1>

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
				<Search class="h-6 w-6" />
				<span class="font-medium">Search</span>
			</a>
		</nav>
	</div>
</div>

<!-- Add padding to main content to account for sidebar -->
<div class="pl-64"></div>
