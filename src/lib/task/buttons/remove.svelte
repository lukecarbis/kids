<script>
	import { createEventDispatcher } from 'svelte';

	export let disabled = false;
	export let confirm = false;

	const handleClick = () => {
		if (!confirm) {
			dispatch('confirm');
			confirm = true;
			return;
		}

		confirm = false;
		dispatch('remove');
	};

	const dispatch = createEventDispatcher();
</script>

<div tabindex="0" on:focusout={() => (confirm = false)}>
	<button
		class="border border-b-2 w-10 h-8 flex justify-center items-center box-content active:mt-px active:border-b rounded-lg"
		{disabled}
		tabIndex="0"
		class:pointer-events-none={disabled}
		on:click={handleClick}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class:stroke-amber-500={!confirm && !disabled}
			class:stroke-rose-500={confirm && !disabled}
			class:stroke-slate-200={disabled}
			class:w-5={!confirm}
			class:h-5={!confirm}
			class:w-6={confirm}
			class:h-6={confirm}
			class:shake={confirm}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
			/>
		</svg>
	</button>
</div>

<style>
	.shake {
		animation: shake 0.25s infinite;
	}

	@keyframes shake {
		0% {
			transform: rotate(-5deg);
		}
		50% {
			transform: rotate(-12deg);
		}
		100% {
			transform: rotate(-5deg);
		}
	}
</style>
