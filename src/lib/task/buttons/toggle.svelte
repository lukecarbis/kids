<script>
	import { createEventDispatcher } from 'svelte';
	export let done;

	const dispatch = createEventDispatcher();

	const toggle = () => {
		done = !done;
		dispatch('toggle', done);
	};
</script>

<button
	class="border border-b-2 bg-white active:mt-px active:border-b rounded-lg px-4 py-1"
	on:click={toggle}
>
	{#if !done}
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
