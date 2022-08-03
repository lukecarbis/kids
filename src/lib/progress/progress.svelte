<script>
	import { queue, getNextTask } from '$lib/stores/queue';
	import { slide } from 'svelte/transition';

	$: percentDone = 100 - ($queue.totalRemaining / $queue.tasks.length) * 100;

	const flagPositions = [];
	for (const checkpoint of $queue.checkpoints) {
		const position = ((checkpoint.toIndex + 1) / $queue.tasks.length) * 100;
		flagPositions.push(position);
	}

	flagPositions.pop();
</script>

<footer
	class="px-6 pt-7 pb-5 w-full bottom-0 z-10 flex items-stretch justify-between border-t-2 border-b-slate-200 bg-white fixed"
	out:slide
>
	<div class="bg-slate-200 h-4 w-full rounded-full relative">
		<div
			style="width:{percentDone}%;"
			class="bg-sky-500 h-4 rounded-full px-3 pt-1 transition-all box-border"
			class:bg-sky-500={-1 !== getNextTask($queue.tasks, $queue.checkpoints)}
			class:bg-emerald-400={-1 === getNextTask($queue.tasks, $queue.checkpoints)}
		>
			<div
				class="h-1 w-full rounded-full transform-all"
				class:bg-sky-400={-1 !== getNextTask($queue.tasks, $queue.checkpoints)}
				class:bg-emerald-300={-1 === getNextTask($queue.tasks, $queue.checkpoints)}
			>
				{#each flagPositions as flagPosition}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 fill-amber-400 -top-4 mt-px -ml-3 absolute"
						class:fill-amber-400={percentDone < flagPosition}
						class:fill-emerald-300={percentDone >= flagPosition}
						style="left:{flagPosition}%"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
							clip-rule="evenodd"
						/>
					</svg>
				{/each}
			</div>
		</div>
	</div>
</footer>
