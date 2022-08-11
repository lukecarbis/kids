<script>
	import { lists } from '$lib/stores/lists';
	import { queue, setQueue, isCheckpointOpen } from '$lib/stores/queue';
	import { updateDate } from '$lib/tasks';
	import CheckpointActive from '$lib/checkpoint/checkpoint-active.svelte';
	import CheckpointLocked from '$lib/checkpoint/checkpoint-locked.svelte';
	import CheckpointNone from '$lib/checkpoint/checkpoint-none.svelte';
	import Connector from '$lib/connector/connector.svelte';
	import TaskActive from '$lib/task/task-active.svelte';
	import TaskDone from '$lib/task/task-done.svelte';
	import TaskInactive from '$lib/task/task-inactive.svelte';
	import TaskPending from '$lib/task/task-pending.svelte';
	import Nav from '$lib/nav/nav-app.svelte';
	import Progress from '$lib/progress/progress.svelte';
	import UpNext from '$lib/task/up-next.svelte';
	import { slide } from 'svelte/transition';
	import { resetCheckpoints } from '../../lib/stores/queue.js';

	export let slug;
	let { name, id, checkpoints, lastUpdated } = $lists[slug];

	checkpoints = resetCheckpoints(checkpoints, lastUpdated);
	setQueue(checkpoints, name, id);

	const date = new Date().toISOString().substring(0, 10);

	if (lastUpdated !== date) {
		updateDate(date, id).then(() => {
			lastUpdated = date;
		});
	}
</script>

<Nav {name} />

<div
	id="wrap"
	class="h-calc mt-16 pb-8 font-mono select-none overflow-y-scroll snap-y snap-mandatory"
>
	<main class="max-w-screen-sm mx-auto px-6 relative" out:slide>
		{#if $queue.checkpoints.length > 0}
			{#each $queue.checkpoints as checkpoint, checkpointIndex}
				{#if isCheckpointOpen($queue.checkpoints, checkpointIndex)}
					<CheckpointActive {checkpoint} />
					<Connector />
				{:else}
					<CheckpointLocked {checkpoint} />
					<Connector />
				{/if}

				{#each checkpoint.tasks as task, taskIndex}
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

					{#if taskIndex !== checkpoint.tasks.length - 1}
						<Connector done={task.done} />
					{/if}
				{/each}
			{/each}
		{:else}
			<CheckpointNone />
		{/if}
	</main>
</div>

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

<style>
	.h-calc {
		height: calc(100vh - 8rem);
	}
</style>
