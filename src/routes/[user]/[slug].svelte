<script>
	import { meta } from '$lib/stores/meta';
	import { lists } from '$lib/stores/lists';
	import { updateTask, updateTasks } from '$lib/db';
	import Connected from '$lib/auth/connected.svelte';
	import Loading from '$lib/welcome/loading.svelte';
	import CheckpointActive from '$lib/checkpoint/checkpoint-active.svelte';
	import CheckpointLocked from '$lib/checkpoint/checkpoint-locked.svelte';
	import CheckpointNone from '$lib/checkpoint/checkpoint-none.svelte';
	import Connector from '$lib/connector/connector.svelte';
	import UpNext from '$lib/connector/connector-up-next.svelte';
	import TaskActive from '$lib/task/task-active.svelte';
	import TaskDone from '$lib/task/task-done.svelte';
	import TaskInactive from '$lib/task/task-inactive.svelte';
	import TaskPending from '$lib/task/task-pending.svelte';
	import Progress from '$lib/progress/progress.svelte';
	import { onValue, ref } from 'firebase/database';
	import { db } from '$lib/firebase';
	import { tick } from 'svelte';

	export let uid;
	export let listId;

	meta.set({ uid });

	let loading = true;
	let connected = false;

	const defaults = {
		name: '',
		slug: '',
		lastUpdated: '',
		checkpoints: [],
		totalTasks: 0,
		totalTasksRemaining: 0,
		totalActiveTasksRemaining: 0,
		firstDisabledCheckpoint: 0
	};

	$: list = Object.values($lists).shift() ?? defaults;
	$: name = list.name;
	$: slug = list.slug;
	$: lastUpdated = list.lastUpdated;
	$: checkpoints = list.checkpoints;
	$: totalTasks = list.totalTasks;
	$: totalTasksRemaining = list.totalTasksRemaining;
	$: totalActiveTasksRemaining = list.totalActiveTasksRemaining;
	$: firstDisabledCheckpoint = list.firstDisabledCheckpoint;
	$: activeTask = list.activeTask;

	onValue(ref(db, `${uid}/lists/${listId}`), (snapshot) => {
		const data = {};

		data[listId] = snapshot.val();
		lists.reset(data);

		loading = false;
	});

	onValue(ref(db, '.info/connected'), (snapshot) => {
		connected = snapshot.val();
	});

	const skip = (ci, ti) => {
		updateTask(listId, ci, ti, { skipped: true });
	};

	const done = (ci, ti) => {
		updateTask(listId, ci, ti, { done: true, skipped: false });
	};

	const revert = (ci, ti) => {
		updateTask(listId, ci, ti, { done: false, skipped: false });
	};

	const select = (ci, ti) => {
		const patch = {};

		checkpoints.forEach((checkpoint, checkpointIndex) => {
			if (checkpointIndex < ci) {
				return;
			}
			checkpoint.tasks.forEach((task, taskIndex) => {
				if (taskIndex < ti && checkpointIndex === ci) {
					return;
				}
				if (!task.done && task.visible) {
					patch[`${checkpointIndex}/tasks/${taskIndex}/skipped`] = false;
				}
			});
		});

		updateTasks(listId, patch);
	};

	const startLoading = (ref) => {
		loading.push(ref);
		loading = loading;
	};

	const endLoading = (ref) => {
		const index = loading.indexOf(ref);
		delete loading[index];
		loading = loading;
	};

	$: if (-1 === activeTask) {
		tick().then(() => select(0, 0));
	}
</script>

{#if !loading}
	<p
		class="sticky border-b-2 border-slate-100 top-0 py-4 bg-white z-10 text-center underline underline-offset-2 decoration-2 decoration-sky-500 font-mono select-none"
	>
		Hello {name}!
	</p>
	<main class="max-w-screen-sm mx-auto pb-24 px-6 relative font-mono select-none">
		{#if list.totalTasks > 0}
			{#each checkpoints as checkpoint, checkpointIndex}
				{#if checkpoint.visible}
					{#if checkpoint.open}
						<CheckpointActive {checkpoint} />
						<Connector />
					{:else}
						<CheckpointLocked
							{checkpoint}
							showTime={checkpointIndex === firstDisabledCheckpoint &&
								!checkpoints[checkpointIndex - 1].totalTasksRemaining}
						/>
						<Connector />
					{/if}

					{#each checkpoint.tasks as task, taskIndex}
						{#if task.visible}
							{#if taskIndex === list.activeTask && checkpointIndex === list.activeCheckpoint}
								<UpNext />
							{/if}

							{#if !checkpoint.open}
								<TaskInactive {task} />
							{:else if taskIndex === list.activeTask && checkpointIndex === list.activeCheckpoint}
								<TaskActive
									{task}
									{totalActiveTasksRemaining}
									on:skip={() => skip(checkpointIndex, taskIndex)}
									on:done={() => done(checkpointIndex, taskIndex)}
								/>
							{:else if task.done}
								<TaskDone {task} on:revert={() => revert(checkpointIndex, taskIndex)} />
							{:else}
								<TaskPending {task} on:select={() => select(checkpointIndex, taskIndex)} />
							{/if}

							{#if checkpoint.lastTask !== taskIndex}
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
	>
		<Progress {list} />
	</footer>
{:else}
	<Loading />
{/if}
<Connected {connected} />
