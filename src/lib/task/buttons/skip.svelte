<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let disabled = false;
</script>

<button
	class="py-4 px-8 h-16 border-r border-b active:border-b-transparent active:pt-5 leading-4 align-bottom"
	class:pointer-events-none={disabled}
	class:text-slate-400={disabled}
	class:text-sky-500={!disabled}
	on:click={() => dispatch('skip')}
>
	Skip
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6 inline-block ml-1"
		class:stroke-slate-300={disabled}
		class:stroke-sky-500={!disabled}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
	</svg>
</button>
