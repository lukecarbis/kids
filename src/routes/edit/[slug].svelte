<script>
	import { lists } from '$lib/stores/lists';
	import { browser } from '$app/env';
	import { auth, apiUrl } from '$lib/firebase';
	import Actions from '$lib/task/actions.svelte';
	import Remove from '$lib/task/buttons/remove.svelte';
	import Checkpoint from '$lib/checkpoint/checkpoint-edit.svelte';
	import Connector from '$lib/connector/connector-edit.svelte';
	import Flag from '$lib/connector/connector-flag.svelte';
	import Task from '$lib/task/task-edit.svelte';
	import Nav from '$lib/nav/nav-edit.svelte';

	export let slug;
	let { name, id, checkpoints } = JSON.parse(JSON.stringify($lists[slug]));

	let savedCheckpoints = JSON.stringify(checkpoints);

	let unsaved = false;
	let saving = false;
	let saved = false;

	$: if (checkpoints) {
		unsaved = JSON.stringify(checkpoints) !== savedCheckpoints;
	}

	const addTask = (index, checkpointIndex) => {
		const emptyTask = {
			days: [true, true, true, true, true, false, false],
			description: '',
			emoji: '😁',
			title: ''
		};
		checkpoints[checkpointIndex].tasks.splice(index, 0, emptyTask);
		checkpoints = checkpoints;
	};

	const moveTask = (index, checkpointIndex, direction) => {
		if (0 === index && direction < 0) {
			const tasks = checkpoints[checkpointIndex].tasks;
			const task = tasks.splice(0, 1)[0];
			checkpoints[checkpointIndex - 1].tasks.push(task);

			markTaskMoved(checkpoints[checkpointIndex - 1].tasks.length - 1, checkpointIndex - 1);
			return;
		}

		if (index === checkpoints[checkpointIndex].tasks.length - 1 && direction > 0) {
			const tasks = checkpoints[checkpointIndex].tasks;
			const task = tasks.splice(tasks.length - 1, 1)[0];
			checkpoints[checkpointIndex + 1].tasks.splice(0, 0, task);

			markTaskMoved(0, checkpointIndex + 1);
			return;
		}

		const swapIndex = index + direction;
		const tasks = checkpoints[checkpointIndex].tasks;
		[tasks[index], tasks[swapIndex]] = [tasks[swapIndex], tasks[index]];

		markTaskMoved(swapIndex, checkpointIndex);
	};

	const removeTask = (index, checkpointIndex) => {
		checkpoints[checkpointIndex].tasks[index].removed = true;

		setTimeout(() => {
			checkpoints[checkpointIndex].tasks.splice(index, 1);
			checkpoints = checkpoints;
		}, 1200);
	};

	const markTaskMoved = (index, checkpointIndex) => {
		checkpoints[checkpointIndex].tasks[index].updated = true;
		setTimeout(() => {
			if (
				'undefined' !== typeof checkpoints[checkpointIndex] &&
				'undefined' !== typeof checkpoints[checkpointIndex].tasks[index]
			) {
				checkpoints[checkpointIndex].tasks[index].updated = false;
			}
		}, 1200);
	};

	const addCheckpoint = (index, checkpointIndex) => {
		let updated = JSON.parse(JSON.stringify(checkpoints));
		let hour = 8;

		if (updated[checkpointIndex].hour) {
			hour = updated[checkpointIndex].hour + 1;
			if (hour > 23) {
				hour = 23;
			}
		}

		const emptyCheckpoint = {
			description: '',
			title: '',
			hour
		};
		const firstHalfTasks = updated[checkpointIndex].tasks.slice(0, index);
		const secondHalfTasks = updated[checkpointIndex].tasks.slice(index);

		updated.splice(checkpointIndex + 1, 0, emptyCheckpoint);
		updated[checkpointIndex].tasks = firstHalfTasks;
		updated[checkpointIndex + 1].tasks = secondHalfTasks;
		checkpoints = updated;
	};

	const moveCheckpoint = (checkpointIndex, direction) => {
		if (direction < 0) {
			const tasks = checkpoints[checkpointIndex - 1].tasks;
			if (tasks.length) {
				const task = tasks.splice(tasks.length - 1, 1)[0];
				checkpoints[checkpointIndex].tasks.splice(0, 0, task);
				markCheckpointMoved(checkpointIndex);
				return;
			}
		}

		if (direction > 0) {
			const tasks = checkpoints[checkpointIndex].tasks;
			if (tasks.length) {
				const task = tasks.splice(0, 1)[0];
				checkpoints[checkpointIndex - 1].tasks.push(task);
				markCheckpointMoved(checkpointIndex);
				return;
			}
		}

		const swapIndex = checkpointIndex + direction;
		[checkpoints[checkpointIndex], checkpoints[swapIndex]] = [
			checkpoints[swapIndex],
			checkpoints[checkpointIndex]
		];
		if (direction < 0) {
			checkpoints[checkpointIndex].tasks = [...checkpoints[swapIndex].tasks];
			checkpoints[swapIndex].tasks = [];
		} else {
			checkpoints[swapIndex].tasks = [...checkpoints[checkpointIndex].tasks];
			checkpoints[checkpointIndex].tasks = [];
		}

		markCheckpointMoved(swapIndex);
	};

	const removeCheckpoint = (checkpointIndex) => {
		checkpoints[checkpointIndex].removed = true;
		setTimeout(() => {
			const tasks = [...checkpoints[checkpointIndex].tasks];
			checkpoints[checkpointIndex - 1].tasks.push.apply(
				checkpoints[checkpointIndex - 1].tasks,
				tasks
			);
			checkpoints.splice(checkpointIndex, 1);
			checkpoints = checkpoints;
		}, 1200);
	};

	const markCheckpointMoved = (checkpointIndex) => {
		checkpoints[checkpointIndex].updated = true;
		setTimeout(() => {
			checkpoints[checkpointIndex].updated = false;
		}, 1200);
	};

	const save = async () => {
		saving = true;

		const idToken = await auth.currentUser.getIdToken();
		const uid = auth.currentUser.uid;

		await fetch(`${apiUrl}/${uid}/lists/${id}.json?auth=${idToken}`, {
			method: 'PATCH',
			body: JSON.stringify({ checkpoints })
		});

		savedCheckpoints = JSON.stringify(checkpoints);
		saving = false;
		saved = true;

		setTimeout(() => (saved = false), 1800);
	};

	if (browser) {
		window.onbeforeunload = () => {
			if (unsaved) {
				return true;
			}
		};
	}
</script>

<Nav title="Editing List" back="/" bind:unsaved bind:saving bind:saved on:save={save} />

<div id="wrap" tabindex="0" class="mt-10 pb-8 font-mono select-none">
	<main class="max-w-screen-sm pt-6 mx-auto px-6 relative">
		<div class="my-8 flex gap-4 pb-4 border-b-2">
			<input
				type="text"
				class="border-2 border-transparent text-sky-500 font-bold rounded-lg w-full px-2 h-8 box-content text-center cursor-pointer focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
				bind:value={name}
				on:focus={(event) => setTimeout(() => event.target.select(), 10)}
			/>
			<div class="flex flex-wrap flex-1 gap-2 items-center content-start">
				<Remove />
			</div>
		</div>
		{#each checkpoints as { removed, updated, title, description, hour, tasks }, checkpointIndex}
			<div class="transition-all duration-1000" class:opacity-0={removed}>
				<Flag />
				<div class="checkpoint flex gap-4 items-start" class:pointer-events-none={removed}>
					<Checkpoint
						bind:updated
						bind:title
						bind:description
						bind:fullHour={hour}
						index={checkpointIndex}
					/>
					<Actions
						up={checkpointIndex > 0}
						down={checkpointIndex !== 0 &&
							(checkpointIndex !== checkpoints.length - 1 ||
								checkpoints[checkpoints.length - 1].tasks.length > 0)}
						remove={checkpointIndex > 0}
						on:up={() => moveCheckpoint(checkpointIndex, -1)}
						on:down={() => moveCheckpoint(checkpointIndex, 1)}
						on:remove={() => removeCheckpoint(checkpointIndex)}
					/>
				</div>
			</div>

			<Connector
				last={!tasks.length}
				on:addCheckpoint={() => addCheckpoint(0, checkpointIndex)}
				on:addTask={() => addTask(0, checkpointIndex)}
			/>

			{#each tasks as task, taskIndex}
				<div
					class="task flex gap-4 items-start transition-none duration-1000"
					id={`task-${taskIndex}`}
					class:transition-opacity={task.removed}
					class:opacity-0={task.removed}
					class:pointer-events-none={task.removed}
				>
					<Task
						id="{checkpointIndex}-{taskIndex}"
						bind:updated={tasks[taskIndex].updated}
						bind:title={tasks[taskIndex].title}
						bind:emoji={tasks[taskIndex].emoji}
						bind:days={tasks[taskIndex].days}
					/>
					<Actions
						up={taskIndex > 0 || checkpointIndex > 0}
						down={taskIndex < tasks.length - 1 || checkpointIndex < checkpoints.length - 1}
						on:up={() => moveTask(taskIndex, checkpointIndex, -1)}
						on:down={() => moveTask(taskIndex, checkpointIndex, 1)}
						on:remove={() => removeTask(taskIndex, checkpointIndex)}
					/>
				</div>
				<Connector
					last={taskIndex === tasks.length - 1}
					on:addCheckpoint={() => addCheckpoint(taskIndex + 1, checkpointIndex)}
					on:addTask={() => addTask(taskIndex + 1, checkpointIndex)}
				/>
			{/each}
		{/each}
	</main>
</div>
