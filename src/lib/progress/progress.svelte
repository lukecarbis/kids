<script>
	export let list = {
		checkpoints: [],
		totalTasks: 0,
		totalTasksRemaining: 0,
		activeTask: 0,
		activeCheckpoint: 0
	};

	$: checkpoints = list.checkpoints;
	$: done = list.activeTask === -1;
	$: percentDone = 100 - (list.totalTasksRemaining / list.totalTasks) * 100;
	$: progressLocked = -1 === list.activeCheckpoint && percentDone < 100;
	$: checkpointPositions = [];

	let previousPosition = 0;
	$: for (const checkpoint of checkpoints) {
		if (!checkpoint.visible) {
			continue;
		}
		let position = (checkpoint.totalTasks / list.totalTasks) * 100;
		position = position + previousPosition;
		previousPosition = position;
		checkpointPositions.push(position);
	}

	$: checkpointPositions.pop();
</script>

<div class="bg-slate-200 h-4 w-full rounded-full relative">
	<div
		style="width:{percentDone}%;"
		class="bg-sky-500 h-4 rounded-full px-3 pt-1 transition-all box-border"
		class:px-3={percentDone > 0}
		class:bg-sky-500={!done}
		class:bg-emerald-400={done}
		class:rounded-r-none={progressLocked}
	>
		<div
			class="h-1 w-full rounded-full transform-all"
			class:bg-sky-400={!done}
			class:bg-emerald-300={done}
		>
			{#each checkpointPositions as checkpointPosition, index}
				{#if checkpoints[index + 1] && checkpoints[index + 1].open}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 fill-slate-200 -top-5 -ml-1.5 absolute"
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
						class:border-emerald-500={done}
						class:border-slate-500={!done}
						style="left:{checkpointPosition}%"
					/>
				{/if}
			{/each}
		</div>
	</div>
</div>
