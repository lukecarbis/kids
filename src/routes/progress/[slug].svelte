<script>
	import { queue, setQueue, isCheckpointOpen, getLastTaskIndex } from '$lib/stores/queue';
	import { lists } from '$lib/stores/lists';
	import Nav from '$lib/nav/nav-back.svelte';
	import Checkpoint from '$lib/checkpoint/checkpoint-progress.svelte';
	import CheckpointNone from '$lib/checkpoint/checkpoint-none.svelte';
	import Connector from '$lib/connector/connector-static.svelte';
	import TaskInactive from '$lib/task/task-inactive.svelte';
	import TaskToggle from '$lib/task/task-toggle.svelte';
	import { resetCheckpoints } from '../../lib/stores/queue.js';

	export let slug;
	let { name, id, checkpoints, lastUpdated } = $lists[slug];

	checkpoints = resetCheckpoints(checkpoints, lastUpdated);
	setQueue(checkpoints, name, id);
</script>

<Nav title="{name}: {$queue.totalRemaining} Tasks Remaining" back="/" />

<main class="max-w-screen-sm mx-auto mt-24 pb-20 px-6 relative font-mono select-none">
	{#if $queue.totalTasks > 0}
		{#each checkpoints as checkpoint, checkpointIndex}
			{#if checkpoint.visible}
				<Checkpoint {checkpoint} locked={!isCheckpointOpen(checkpoints, checkpointIndex)} />
				<Connector />

				{#each checkpoint.tasks as task, taskIndex}
					{#if task.visible}
						{#if !isCheckpointOpen(checkpoints, checkpointIndex)}
							<TaskInactive {task} />
						{:else}
							<TaskToggle bind:task {taskIndex} {checkpointIndex} />
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
