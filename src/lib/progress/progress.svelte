<script>
	import { queue, getNextTask, isCheckpointOpen } from '$lib/stores/queue';
	import { slide } from 'svelte/transition';

	$: percentDone = 100 - ($queue.totalRemaining / $queue.totalTasks) * 100;
	$: progressLocked = -1 === getNextTask($queue.checkpoints).checkpoint;

	const checkpointPositions = [];
	let lastPosition = 0;
	for (const checkpoint of $queue.checkpoints) {
		let position = (checkpoint.tasks.length / $queue.totalTasks) * 100;
		position = position + lastPosition;
		lastPosition = position;
		checkpointPositions.push(position);
	}

	checkpointPositions.pop();
</script>

<footer
	class="px-6 pt-7 pb-5 w-full bottom-0 z-10 flex items-stretch justify-between border-t-2 border-b-slate-200 bg-white fixed"
	out:slide
>
	<div class="bg-slate-200 h-4 w-full rounded-full relative">
		<div
			style="width:{percentDone}%;"
			class="bg-sky-500 h-4 rounded-full px-3 pt-1 transition-all box-border"
			class:bg-sky-500={-1 !== getNextTask($queue.checkpoints).task}
			class:bg-emerald-400={-1 === getNextTask($queue.checkpoints).task}
			class:rounded-r-none={progressLocked}
		>
			<div
				class="h-1 w-full rounded-full transform-all"
				class:bg-sky-400={-1 !== getNextTask($queue.checkpoints).task}
				class:bg-emerald-300={-1 === getNextTask($queue.checkpoints).task}
			>
				{#each checkpointPositions as checkpointPosition, index}
					{#if isCheckpointOpen($queue.checkpoints, index + 1)}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 fill-slate-200 -top-5 -ml-3 absolute"
							style="left:{checkpointPosition}%"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"
							/>
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4 fill-slate-400 -top-5 -ml-1.5 absolute"
							style="left:{checkpointPosition}%"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
								clip-rule="evenodd"
							/>
						</svg>
						<span
							class="absolute block h-4 w-0 border-l-2 -mt-1"
							class:border-emerald-500={-1 === getNextTask($queue.checkpoints).task}
							class:border-slate-500={-1 !== getNextTask($queue.checkpoints).task}
							style="left:{checkpointPosition}%"
						/>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</footer>
