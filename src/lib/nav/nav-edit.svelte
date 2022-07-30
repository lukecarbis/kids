<script>
	import { createEventDispatcher } from 'svelte';
	export let title;
	export let back;

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
	<button on:click={() => dispatch('more')}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 stroke-sky-500"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
			/>
		</svg>
	</button>
</header>
