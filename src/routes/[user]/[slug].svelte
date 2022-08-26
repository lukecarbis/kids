<script>
	import { meta } from '$lib/stores/meta';
	import { lists } from '$lib/stores/lists';
	import { updateTask, updateTasks } from '$lib/db';
	import Status from '$lib/auth/status.svelte';
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
	import { inview } from 'svelte-inview';
	import { animateScroll, scrollto } from 'svelte-scrollto-element';
	import { tick } from 'svelte';
	import { browser } from '$app/env';

	export let uid;
	export let listId;

	meta.set({ uid });

	let loading = true;
	let connected = true;
	let activeTaskDirection = 'visible';

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

		if (loading && browser) {
			setTimeout(() => {
				animateScroll.scrollTo({ element: '.up-next' });
			}, 500);
		}

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

	$: if (-1 === activeTask) {
		tick().then(() => select(0, 0));
	}
</script>

{#if !loading}
	<main class="max-w-screen-sm mx-auto mt-8 pb-24 px-6 relative font-mono select-none">
		<p class="text-center underline underline-offset-2 decoration-2 decoration-sky-500">
			Hello, {name}!
		</p>
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
								<div
									use:inview
									on:change={(event) => {
										const { inView, scrollDirection } = event.detail;
										if (inView) {
											activeTaskDirection = 'visible';
										} else {
											activeTaskDirection = scrollDirection.vertical;
										}
									}}
								>
									<TaskActive
										{task}
										{totalActiveTasksRemaining}
										disabled={!connected}
										on:skip={() => skip(checkpointIndex, taskIndex)}
										on:done={() => done(checkpointIndex, taskIndex)}
									/>
								</div>
							{:else if task.done}
								<TaskDone
									{task}
									disabled={!connected}
									on:revert={() => revert(checkpointIndex, taskIndex)}
								/>
							{:else}
								<TaskPending
									{task}
									disabled={!connected}
									on:select={() => select(checkpointIndex, taskIndex)}
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
			<CheckpointNone />
		{/if}
		{#if 'visible' !== activeTaskDirection}
			<button
				class="fixed bottom-20 right-6 border-2 border-b-4 rounded-lg p-2 bg-white active:mt-px active:border-b-2"
				use:scrollto={'.up-next'}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 stroke-sky-500"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					{#if 'up' === activeTaskDirection}
						<path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
					{/if}
					{#if 'down' === activeTaskDirection}
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
					{/if}
				</svg>
			</button>
		{/if}
	</main>

	<footer
		class="px-6 pt-7 pb-5 w-full bottom-0 z-10 flex items-stretch justify-between border-t-2 border-b-slate-200 bg-white fixed"
	>
		<Progress {list} />
	</footer>

	<div class="fixed top-6 left-6">
		<Status />
	</div>
{:else}
	<Loading />
{/if}
