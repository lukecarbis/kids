<script>
	import { emojiCode } from '$lib/helpers/emoji-code.js';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let job;
	export let index;
	let pressTimer = null;

	const cancel = function (event) {
		if (pressTimer !== null) {
			clearTimeout(pressTimer);
			pressTimer = null;
		}

		const container = event.target.closest('div');
		container.classList.remove('-rotate-1');
	};

	const start = function (event) {
		if (event.type === 'click' && event.button !== 0) {
			return;
		}

		const container = event.target.closest('div');
		container.classList.add('-rotate-1');

		if (pressTimer === null) {
			pressTimer = setTimeout(() => {
				dispatch('revert', { index });
				container.classList.remove('-rotate-1');
			}, 1500);
		}

		return false;
	};
</script>

<div
	class="p-4 border-2 rounded-lg flex flex-wrap bg-emerald-100 border-emerald-300 items-stretch justify-between rounded-lg snap-always snap-start scroll-mt-6 transition-transform"
	on:mousedown={start}
	on:mouseout={cancel}
	on:blur={cancel}
	on:click={cancel}
	on:touchstart={start}
	on:touchend={cancel}
	on:touchleave={cancel}
	on:touchcancel={cancel}
>
	<span class="mr-4 text-center w-6">
		<img src="/openmoji/{emojiCode(job.emoji)}.svg" alt={job.emoji} />
	</span>
	<h2 class="flex-auto text-center">
		{job.title}
	</h2>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6 ml-4 fill-emerald-400"
		viewBox="0 0 20 20"
		fill="currentColor"
	>
		<path
			fill-rule="evenodd"
			d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
			clip-rule="evenodd"
		/>
	</svg>
</div>
