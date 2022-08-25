<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let disabled = false;
</script>

<button
	class="flex-auto border-l border-b active:pt-5 py-4 px-8 h-16 leading-4"
	{disabled}
	class:pointer-events-none={disabled}
	class:text-slate-400={disabled}
	class:text-emerald-500={!disabled}
	on:click={() => dispatch('done')}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6 inline-block mr-1"
		class:stroke-slate-300={disabled}
		class:stroke-emerald-500={!disabled}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
	</svg>
	Done
</button>
