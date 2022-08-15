<script>
	import { queue, setQueue } from '$lib/stores/queue';
	import LongPress from '$lib/task/long-press.svelte';
	import { updateTask } from '$lib/tasks';

	export let task;
	export let taskIndex;
	export let checkpointIndex;

	const revert = () => {
		const checkpoints = [...$queue.checkpoints];
		checkpoints[checkpointIndex].tasks[taskIndex].done = false;
		updateTask(checkpointIndex, taskIndex, { done: false, skipped: true });
		setQueue(checkpoints);
	};
</script>

<LongPress cb={revert} timeout="1200">
	<div
		class="p-4 border-2 rounded-lg flex flex-wrap bg-emerald-50 border-emerald-400 items-stretch justify-between rounded-lg transition-transform"
	>
		<span class="mr-4 text-center w-6">
			<em-emoji set="twitter" size="24px" native={task.emoji} />
		</span>
		<h3 class="flex-1 text-center">
			{task.title}
		</h3>
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
</LongPress>
