<script>
	import { lists } from '$lib/stores/lists';
	import { updateTask } from '$lib/db';
	import Connected from '$lib/auth/connected.svelte';
	import Nav from '$lib/nav/nav-back.svelte';
	import Checkpoint from '$lib/checkpoint/checkpoint-progress.svelte';
	import CheckpointNone from '$lib/checkpoint/checkpoint-none.svelte';
	import Connector from '$lib/connector/connector-static.svelte';
	import TaskInactive from '$lib/task/task-inactive.svelte';
	import TaskToggle from '$lib/task/task-toggle.svelte';
	import { onValue, ref } from 'firebase/database';
	import { db } from '$lib/firebase.js';

	export let slug;
	const listId = lists.getId(slug);

	let loading = [];
	let connected = false;

	$: list = $lists[listId];
	$: name = $lists[listId].name;
	$: checkpoints = $lists[listId].checkpoints;

	onValue(ref(db, '.info/connected'), (snapshot) => {
		connected = snapshot.val();
	});

	const startLoading = (ref) => {
		loading.push(ref);
		loading = loading;
	};

	const endLoading = (ref) => {
		const index = loading.indexOf(ref);
		delete loading[index];
		loading = loading;
	};
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
							{@const ref = [checkpointIndex, taskIndex].join('/')}
							<TaskToggle
								bind:task
								loading={loading.indexOf(ref) !== -1}
								on:toggle={async ({ detail: done }) => {
									startLoading(ref);
									await updateTask(listId, checkpointIndex, taskIndex, { done });
									endLoading(ref);
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
<div class="fixed bottom-6 left-6">
	<Connected {connected} />
</div>
