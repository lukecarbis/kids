<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let disabled = false;
</script>

<button
	class="border border-b-2 active:mt-px active:border-b rounded-lg px-4 py-1"
	class:pointer-events-none={disabled}
	on:click={() => dispatch('select')}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-4 w-4"
		class:stroke-slate-300={disabled}
		class:stroke-sky-500={!disabled}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
		/>
	</svg>
</button>
