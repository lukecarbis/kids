<script>
	import { createEventDispatcher } from 'svelte';

	export let disabled = false;
	export let index = 0;
	let confirm = false;

	const handleClick = () => {
		if (!confirm) {
			confirm = true;
			return;
		}

		confirm = false;
		dispatch('delete', index);
	};

	const dispatch = createEventDispatcher();
</script>

<button
	class="border border-b-2 w-10 h-8 flex justify-center items-center box-content active:mt-px active:border-b rounded-lg"
	{disabled}
	class:pointer-events-none={disabled}
	on:click={handleClick}
>
	{#if !confirm}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5 fill-amber-500"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
				clip-rule="evenodd"
			/>
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5 stroke-rose-400"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
			/>
		</svg>
	{/if}
</button>
