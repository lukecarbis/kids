<script>
	import { createEventDispatcher } from 'svelte';
	export let name;
	export let loading;
	const dispatch = createEventDispatcher();
</script>

<div class="flex-grow mb-4">
	<button
		class="py-2 px-6 relative font-bold border-2 border-b-4 rounded-lg w-full active:border-b-2 active:mt-px active:mb-px"
		class:bg-sky-400={name.length >= 2}
		class:bg-slate-50={name.length < 2}
		class:text-white={name.length >= 2}
		class:text-slate-300={name.length < 2}
		class:border-sky-600={name.length >= 2}
		class:border-slate-300={name.length < 2}
		class:pointer-events-none={name.length < 2}
		on:click={() => dispatch('next')}
	>
		{#if loading}
			<svg
				class="animate-spin mx-auto h-6 w-6 text-white"
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
		{:else}
			Next
		{/if}
	</button>
</div>
