<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Search } from 'lucide-svelte';

	export let value = '';
	const dispatch = createEventDispatcher<{ search: string }>();

	function handleSubmit(event: Event) {
		event.preventDefault();
		if (value.trim()) {
			dispatch('search', value.trim());
		}
	}
</script>

<form class="w-full" on:submit={handleSubmit}>
	<div class="relative">
		<Search class="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-white/60" />
		<input
			bind:value
			type="search"
			placeholder="Search tracks..."
			class="h-12 w-full rounded-full bg-white/10 pr-4 pl-12 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/20 focus:outline-none"
		/>
	</div>
</form>

<style>
	/* Add any component-specific styles here */
</style>
