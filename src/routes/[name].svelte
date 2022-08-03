<script>
	import { queue, setQueue, isCheckpointOpen } from '$lib/stores/queue';
	import CheckpointActive from '$lib/checkpoint/checkpoint-active.svelte';
	import CheckpointLocked from '$lib/checkpoint/checkpoint-locked.svelte';
	import Connector from '$lib/connector/connector.svelte';
	import TaskActive from '$lib/task/task-active.svelte';
	import TaskDone from '$lib/task/task-done.svelte';
	import TaskInactive from '$lib/task/task-inactive.svelte';
	import TaskPending from '$lib/task/task-pending.svelte';
	import Nav from '$lib/nav/nav-app.svelte';
	import Progress from '$lib/progress/progress.svelte';
	import UpNext from '$lib/task/up-next.svelte';
	import { slide } from 'svelte/transition';

	export let name;
	export let checkpoints;
	export let tasks;

	setQueue(tasks, checkpoints, name);
</script>

<Nav {name} />

<div
	id="wrap"
	class="h-calc mt-16 pb-8 font-mono select-none overflow-y-scroll snap-y snap-mandatory"
>
	<main class="max-w-screen-sm mx-auto px-6 relative" out:slide>
		{#each $queue.checkpoints as checkpoint}
			{#if isCheckpointOpen(checkpoint)}
				<CheckpointActive {checkpoint} />
				<Connector />
			{:else}
				<CheckpointLocked {checkpoint} />
				<Connector />
			{/if}

			{#each $queue.tasks as task, index}
				{#if index >= checkpoint.fromIndex && index <= checkpoint.toIndex}
					{#if index === $queue.active && index !== checkpoint.fromIndex}
						<UpNext />
					{/if}

					{#if !isCheckpointOpen(checkpoint)}
						<TaskInactive {task} />
					{:else if index === $queue.active}
						<TaskActive {task} />
					{:else if task.done}
						<TaskDone {task} {index} />
					{:else}
						<TaskPending {task} {index} />
					{/if}

					{#if index !== checkpoint.toIndex}
						<Connector done={task.done && index !== checkpoint.toIndex} />
					{/if}
				{/if}
			{/each}
		{/each}
	</main>
</div>

<Progress />

<style>
	.h-calc {
		height: calc(100vh - 8rem);
	}
</style>
