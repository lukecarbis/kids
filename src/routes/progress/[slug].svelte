<script>
	import { lists } from '$lib/stores/lists';
	import { updateTask } from '$lib/db';
	import Nav from '$lib/nav/nav-back.svelte';
	import Checkpoint from '$lib/checkpoint/checkpoint-progress.svelte';
	import CheckpointNone from '$lib/checkpoint/checkpoint-none.svelte';
	import Connector from '$lib/connector/connector-static.svelte';
	import TaskInactive from '$lib/task/task-inactive.svelte';
	import TaskToggle from '$lib/task/task-toggle.svelte';

	export let slug;
	const listId = lists.getId(slug);

	$: list = $lists[listId];
	$: name = $lists[listId].name;
	$: checkpoints = $lists[listId].checkpoints;
</script>

<Nav
	title="{name}: Completed {list.totalTasks - list.totalTasksRemaining} / {list.totalTasks} Tasks"
	back="/"
/>

<main class="max-w-screen-sm mx-auto mt-24 pb-20 px-6 relative font-mono select-none">
	{#if list.totalTasks > 0}
		{#each checkpoints as checkpoint, checkpointIndex}
			{#if checkpoint.visible}
				<Checkpoint {checkpoint} open={!checkpoint.open} />

				<Connector />

				{#each checkpoint.tasks as task, taskIndex}
					{#if task.visible}
						{#if !checkpoint.open}
							<TaskInactive {task} />
						{:else}
							<TaskToggle
								bind:task
								on:toggle={({ detail: done }) => {
									updateTask(listId, checkpointIndex, taskIndex, { done });
								}}
							/>
						{/if}

						{#if checkpoint.lastTask !== taskIndex}
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
