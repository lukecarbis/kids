<script>
	import { queues, isCheckpointOpen, getLastTaskIndex, resetQueue } from '$lib/stores/queues';
	import { lists, getListId } from '$lib/stores/lists';
	import { updateTask, updateList } from '$lib/db';
	import Nav from '$lib/nav/nav-back.svelte';
	import Checkpoint from '$lib/checkpoint/checkpoint-progress.svelte';
	import CheckpointNone from '$lib/checkpoint/checkpoint-none.svelte';
	import Connector from '$lib/connector/connector-static.svelte';
	import TaskInactive from '$lib/task/task-inactive.svelte';
	import TaskToggle from '$lib/task/task-toggle.svelte';

	export let slug;
	const listId = getListId(slug);
	const list = $lists[listId];
	const queue = $queues[slug];

	$: name = $lists[listId].name;
	$: checkpoints = resetQueue($lists[listId].checkpoints, list.lastUpdated);

	const date = new Date().toLocaleDateString('sv');

	if (list.lastUpdated !== date) {
		list.lastUpdated = date;
		updateList(listId, list);
	}
</script>

<Nav
	title="{name}: Completed {queue.totalTasks - queue.totalRemaining} / {queue.totalTasks} Tasks"
	back="/"
/>

<main class="max-w-screen-sm mx-auto mt-24 pb-20 px-6 relative font-mono select-none">
	{#if queue.totalTasks > 0}
		{#each checkpoints as checkpoint, checkpointIndex}
			{#if checkpoint.visible}
				<Checkpoint {checkpoint} locked={!isCheckpointOpen(checkpoints, checkpointIndex)} />

				<Connector />

				{#each checkpoint.tasks as task, taskIndex}
					{#if task.visible}
						{#if !isCheckpointOpen(checkpoints, checkpointIndex)}
							<TaskInactive {task} />
						{:else}
							<TaskToggle
								bind:task
								on:toggle={({ detail: done }) => {
									updateTask(listId, checkpointIndex, taskIndex, { done });
								}}
							/>
						{/if}

						{#if getLastTaskIndex(checkpoint) !== taskIndex}
							<Connector done={task.done} />
						{/if}
					{/if}
				{/each}
			{/if}
		{/each}
	{:else}
		<CheckpointNone {name} possessiveName="{name}'s" />
	{/if}
</main>
