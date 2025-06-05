<script lang="ts">
	import '../app.css';
	import Sidebar from '../components/Sidebar.svelte';
	import Player from '../components/Player.svelte';
</script>

<div class="flex min-h-screen flex-col bg-gradient-to-b from-[#1E1E1E] to-black text-white">
	<div class="relative flex flex-1">
		<Sidebar />

		<main class="flex-1 overflow-auto p-4 pb-24">
			<slot />
		</main>
	</div>

	<div class="sticky bottom-0 w-full">
		<Player />
	</div>
</div>
