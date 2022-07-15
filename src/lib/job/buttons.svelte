<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let remaining;
</script>

<div class="bg-white rounded-b-lg border-2 border-t-0 flex">
	{#if remaining > 1}
		<button
			class="py-4 px-8 h-16 border-r border-b active:border-b-transparent active:pt-5 leading-4 text-sky-500 align-bottom"
			on:click={() => dispatch('skip')}
		>
			Skip
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 inline-block ml-1 stroke-sky-500 "
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
			</svg>
		</button>
	{/if}
	<button
		class="flex-auto border-l border-b active:pt-5 active:border-b-transparent py-4 px-8 h-16 leading-4 text-emerald-500"
		on:click={() => dispatch('done')}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 inline-block mr-1 stroke-emerald-500"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
		</svg>
		Done
	</button>
</div>
