<script>
	import { createEventDispatcher } from 'svelte';
	export let done = false;
	export let loading = false;

	const dispatch = createEventDispatcher();

	const toggle = () => {
		if (loading) {
			return;
		}
		dispatch('toggle', !done);
	};
</script>

<button
	class="border border-b-2 bg-white rounded-lg px-4 py-1"
	disabled={loading}
	class:active:mt-px={!loading}
	class:active:border-b={!loading}
	class:mt-px={loading}
	class:border-b={loading}
	on:click={toggle}
>
	{#if loading}
		<svg
			class="animate-spin mx-auto h-4 w-4 text-slate-300"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	{:else if !done}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-4 w-4 stroke-emerald-500"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="3"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-4 w-4 fill-amber-400"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
				clip-rule="evenodd"
			/>
		</svg>
	{/if}
</button>
