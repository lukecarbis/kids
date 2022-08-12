<script>
	import { queue, setQueue, isCheckpointOpen, getLastTaskIndex } from '$lib/stores/queue';
	import { meta } from '$lib/stores/meta';
	import { updateDate } from '$lib/tasks';
	import CheckpointActive from '$lib/checkpoint/checkpoint-active.svelte';
	import CheckpointLocked from '$lib/checkpoint/checkpoint-locked.svelte';
	import CheckpointNone from '$lib/checkpoint/checkpoint-none.svelte';
	import Connector from '$lib/connector/connector.svelte';
	import TaskActive from '$lib/task/task-active.svelte';
	import TaskDone from '$lib/task/task-done.svelte';
	import TaskInactive from '$lib/task/task-inactive.svelte';
	import TaskPending from '$lib/task/task-pending.svelte';
	import Progress from '$lib/progress/progress.svelte';
	import UpNext from '$lib/task/up-next.svelte';
	import { slide } from 'svelte/transition';
	import { resetCheckpoints } from '../../lib/stores/queue.js';

	export let list;
	export let uid;
	let { name, id, checkpoints, lastUpdated } = list;

	meta.set({ uid });
	checkpoints = resetCheckpoints(checkpoints, lastUpdated);
	setQueue(checkpoints, name, id);

	const date = new Date().toISOString().substring(0, 10);

	if (lastUpdated !== date) {
		updateDate(date, id).then(() => {
			lastUpdated = date;
		});
	}
</script>

<main class="max-w-screen-sm mx-auto mt-8 mb-20 px-6 relative font-mono select-none" out:slide>
	{#if $queue.totalTasks > 0}
		<p class="text-center underline underline-offset-2 decoration-2 decoration-sky-500">
			Hello {name}!
		</p>
		{#each $queue.checkpoints as checkpoint, checkpointIndex}
			{#if checkpoint.visible}
				{#if isCheckpointOpen($queue.checkpoints, checkpointIndex)}
					<CheckpointActive {checkpoint} />
					<Connector />
				{:else}
					<CheckpointLocked {checkpoint} />
					<Connector />
				{/if}

				{#each checkpoint.tasks as task, taskIndex}
					{#if task.visible}
						{#if taskIndex === $queue.activeTask && checkpointIndex === $queue.activeCheckpoint}
							<UpNext />
						{/if}

						{#if !isCheckpointOpen($queue.checkpoints, checkpointIndex)}
							<TaskInactive {task} />
						{:else if taskIndex === $queue.activeTask && checkpointIndex === $queue.activeCheckpoint}
							<TaskActive {task} />
						{:else if task.done}
							<TaskDone {task} {taskIndex} {checkpointIndex} />
						{:else}
							<TaskPending {task} {taskIndex} {checkpointIndex} />
						{/if}

						{#if getLastTaskIndex(checkpoint) !== taskIndex}
							<Connector done={task.done} />
						{/if}
					{/if}
				{/each}
			{/if}
		{/each}
	{:else}
		<CheckpointNone />
	{/if}
</main>

<footer
	class="px-6 pt-7 pb-5 w-full bottom-0 z-10 flex items-stretch justify-between border-t-2 border-b-slate-200 bg-white fixed"
	out:slide
>
	<Progress
		checkpoints={$queue.checkpoints}
		totalTasks={$queue.totalTasks}
		totalRemaining={$queue.totalRemaining}
	/>
</footer>
Z
