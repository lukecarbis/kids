<script>
	import { createEventDispatcher } from 'svelte';

	export let active = 0;

	const dispatch = createEventDispatcher();

	const handleClick = () => {
		if (!active) {
			active = 1;
			return;
		}

		if (1 === active) {
			dispatch('addTask');
			active = 0;
			return;
		}

		if (2 === active) {
			dispatch('addCheckpoint');
			active = 0;
			return;
		}
	};
</script>

<div tabindex="0" on:focusout={() => (active = 0)} class="flex justify-center h-10">
	{#if 2 === active}
		<button
			class="border-2 border-b-4 rounded-full rounded-r-none px-3 -ml-10 -mr-px transition-all active:border-b-2 active:mt-px"
			on:click={() => active--}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 stroke-sky-500"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
			</svg>
		</button>
	{/if}
	<button
		class="border-2 border-b-4 rounded-full text-sm flex justify-center items-center transition-all active:border-b-2 active:mt-px"
		on:click={handleClick}
		class:w-10={!active}
		class:px-4={active}
		class:rounded-r-none={1 === active}
		class:rounded-l-none={2 === active}
		class:-mr-px={1 === active}
		class:-ml-px={2 === active}
	>
		{#if 1 === active}
			Add Task
		{:else if 2 === active}
			Add Checkpoint
		{:else}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 text-slate-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
			</svg>
		{/if}
	</button>
	{#if 1 === active}
		<button
			class="border-2 border-b-4 rounded-full rounded-l-none px-3 -mr-10 -ml-px transition-all active:border-b-2 active:mt-px"
			on:click={() => active++}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 stroke-sky-500"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	{/if}
</div>
