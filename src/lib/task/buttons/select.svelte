<script>
	import { queue, setQueue } from '$lib/stores/queue';
	import { updateTasks } from '$lib/tasks';

	export let taskIndex;
	export let checkpointIndex;

	const select = () => {
		const checkpoints = [...$queue.checkpoints];
		const patch = {};

		checkpoints.forEach((checkpoint, ci) => {
			if (ci < checkpointIndex) {
				return;
			}
			checkpoint.tasks.forEach((task, ti) => {
				if (ti < taskIndex && ci === checkpointIndex) {
					return;
				}
				if (!task.done) {
					checkpoints[ci].tasks[ti].skipped = false;
					patch[`${ci}/tasks/${ti}/skipped`] = false;
				}
			});
		});

		updateTasks(checkpointIndex, patch);
		setQueue(checkpoints);
	};
</script>

<button
	class="border border-b-2 active:mt-px active:border-b rounded-lg px-4 py-1"
	on:click={select}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-4 w-4 stroke-sky-400"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
		/>
	</svg>
</button>
