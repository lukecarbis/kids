<script>
	import { createEventDispatcher } from 'svelte';

	export let title;
	export let back;
	export let unsaved;
	export let saving;
	export let saved;

	const dispatch = createEventDispatcher();
</script>

<header
	class="px-6 py-5 w-full top-0 z-10 font-mono flex items-stretch justify-between border-b-2 border-b-slate-200 bg-white fixed"
>
	<a href={back} class="w-10">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 stroke-sky-500"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
		</svg>
	</a>
	<h2 class="flex-auto text-center font-bold">{title}</h2>
	<div class="w-20 ml-4 -mt-2 flex items-center justify-end">
		{#if saved}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 stroke-emerald-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
			</svg>
		{:else if saving}
			<svg
				class="animate-spin h-5 w-5 text-sky-400"
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
		{:else if unsaved}
			<button
				class="absolute px-4 text-sm bg-sky-400 text-white border-b-2 border-sky-600 h-8 rounded-lg active:mt-px active:border-b"
				on:click={() => dispatch('save')}
			>
				Save
			</button>
		{/if}
	</div>
</header>
