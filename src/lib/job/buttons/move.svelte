<script>
	import { createEventDispatcher } from 'svelte';

	export let direction = 'up';
	export let index = 0;
	export let disabled = false;

	const dispatch = createEventDispatcher();
</script>

<button
	class="border border-b-2 w-10 h-8 flex justify-center items-center box-content active:mt-px active:border-b rounded-lg"
	{disabled}
	class:pointer-events-none={disabled}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6 stroke-sky-500"
		class:stroke-slate-200={disabled}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		{#if 'up' === direction}
			<path
				on:click={() => dispatch('up', index)}
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M7 11l5-5m0 0l5 5m-5-5v12"
			/>
		{/if}
		{#if 'down' === direction}
			<path
				on:click={() => dispatch('down', index)}
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M17 13l-5 5m0 0l-5-5m5 5V6"
			/>
		{/if}
	</svg>
</button>
