<script>
	import { browser } from '$app/env';
	import { auth, apiUrl } from '$lib/firebase';
	import Actions from '$lib/task/actions.svelte';
	import Checkpoint from '$lib/checkpoint/checkpoint-edit.svelte';
	import Connector from '$lib/connector/connector-edit.svelte';
	import Flag from '$lib/connector/connector-flag.svelte';
	import Task from '$lib/task/task-edit.svelte';
	import Nav from '$lib/nav/nav-edit.svelte';

	export let name;
	export let checkpoints;
	export let tasks;

	let checkpointsCompare = JSON.stringify(checkpoints);
	let tasksCompare = JSON.stringify(tasks);

	let unsaved = false;
	let saving = false;
	let saved = false;

	$: if (tasks || checkpoints) {
		let unsavedTasks = JSON.stringify(tasks) !== tasksCompare;
		let unsavedCheckpoints = JSON.stringify(checkpoints) !== checkpointsCompare;
		unsaved = unsavedTasks || unsavedCheckpoints;
	}

	const addTask = (index) => {
		const emptyTask = {
			days: [true, true, true, true, true, false, false],
			description: '',
			emoji: '😁',
			title: ''
		};
		tasks.splice(index, 0, emptyTask);
		tasks = tasks;
	};

	const moveTask = (index, direction) => {
		const swap = index + direction;
		let movedIntoCheckpoint = false;

		checkpoints.every((checkpoint, ci) => {
			// If moving a task down.
			if (direction > 0 && swap === checkpoint.fromIndex) {
				checkpoints[ci].fromIndex--;
				checkpoints[ci - 1].toIndex--;
				movedIntoCheckpoint = true;
				markTaskMoved(index);
				return false;
			}

			// If moving a task up.
			if (direction < 0 && swap === checkpoint.toIndex) {
				checkpoints[ci].toIndex++;
				checkpoints[ci + 1].fromIndex++;
				movedIntoCheckpoint = true;
				markTaskMoved(index);
				return false;
			}

			return true;
		});

		if (movedIntoCheckpoint) {
			return;
		}

		[tasks[index], tasks[swap]] = [tasks[swap], tasks[index]];
		markTaskMoved(swap);
	};

	const removeTask = (index) => {
		tasks[index].removed = true;

		setTimeout(() => {
			checkpoints.every((checkpoint, ci) => {
				// If moving a task down.
				if (checkpoint.fromIndex >= index) {
					checkpoints[ci].toIndex--;
					if (ci > 0) {
						checkpoints[ci].fromIndex = checkpoints[ci - 1].toIndex + 1;
					}
				}

				return true;
			});

			tasks.splice(index, 1);
			tasks = tasks;
		}, 1200);
	};

	const markTaskMoved = (index) => {
		tasks[index].updated = true;
		setTimeout(() => (tasks[index].updated = false), 1200);
	};

	const canMoveCheckpointUp = (checkpoint, index) => {
		if (checkpoint.fromIndex === 0) {
			return false;
		}

		const previousCheckpoint = checkpoints[index - 1];
		return previousCheckpoint.toIndex >= previousCheckpoint.fromIndex;
	};

	const canMoveCheckpointDown = (checkpoint, index) => {
		if (index === 0) {
			return false;
		}

		if (checkpoint.toIndex < checkpoint.fromIndex) {
			return false;
		}

		return checkpoint.fromIndex < tasks.length;
	};

	const addCheckpoint = (ci, ti) => {
		let toIndex = tasks.length - 1;
		if (ci + 1 in checkpoints) {
			toIndex = checkpoints[ci + 1].fromIndex - 1;
		}
		checkpoints[ci].toIndex = ti - 1;
		const emptyCheckpoint = {
			description: '',
			fromIndex: ti,
			hour: 0,
			title: '',
			toIndex: toIndex
		};
		checkpoints.splice(ci + 1, 0, emptyCheckpoint);
		checkpoints = checkpoints;
	};

	const moveCheckpoint = (index, direction) => {
		const clone = [...checkpoints];

		clone[index].fromIndex = clone[index].fromIndex + direction;
		clone[index - 1].toIndex = clone[index - 1].toIndex + direction;

		markCheckpointMoved(index);
		checkpoints = clone;
	};

	const removeCheckpoint = (index) => {
		checkpoints[index].removed = true;
		setTimeout(() => {
			checkpoints[index - 1].toIndex = checkpoints[index].toIndex;
			checkpoints.splice(index, 1);
			checkpoints = checkpoints;
		}, 1200);
	};

	const markCheckpointMoved = (index) => {
		checkpoints[index].updated = true;
		setTimeout(() => (checkpoints[index].updated = false), 1200);
	};

	const save = async () => {
		saving = true;

		const idToken = await auth.currentUser.getIdToken();
		const uid = auth.currentUser.uid;

		await fetch(`${apiUrl}/${uid}/${name}.json?auth=${idToken}`, {
			method: 'PUT',
			body: JSON.stringify({ checkpoints, tasks })
		});

		checkpointsCompare = JSON.stringify(checkpoints);
		tasksCompare = JSON.stringify(tasks);
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

<Nav title={name} back="/edit" bind:unsaved bind:saving bind:saved on:save={save} />

<div id="wrap" tabindex="0" class="mt-10 pb-8 font-mono select-none">
	<main class="max-w-screen-sm pt-6 mx-auto px-6 relative">
		{#each checkpoints as checkpoint, ci}
			<div class="transition-all duration-1000" class:opacity-0={checkpoint.removed}>
				<Flag />
				<div
					class="checkpoint flex gap-4 items-start"
					class:pointer-events-none={checkpoint.removed}
				>
					<Checkpoint
						bind:updated={checkpoints[ci].updated}
						bind:title={checkpoints[ci].title}
						bind:description={checkpoints[ci].description}
						bind:fromIndex={checkpoints[ci].fromIndex}
					/>

					<Actions
						up={canMoveCheckpointUp(checkpoint, ci)}
						down={canMoveCheckpointDown(checkpoint, ci)}
						remove={0 !== ci}
						on:up={() => moveCheckpoint(ci, -1)}
						on:down={() => moveCheckpoint(ci, 1)}
						on:remove={() => removeCheckpoint(ci)}
					/>
				</div>
			</div>

			<Connector
				last={checkpoint.fromIndex === tasks.length || checkpoint.toIndex < checkpoint.fromIndex}
				on:addCheckpoint={() => addCheckpoint(ci, checkpoint.fromIndex)}
				on:addTask={() => addTask(checkpoint.fromIndex)}
			/>

			{#each tasks as task, ti}
				{#if ti >= checkpoint.fromIndex && ti <= checkpoint.toIndex}
					<div
						class="task flex gap-4 items-start transition-none duration-1000"
						id={`task-${ti}`}
						class:transition-opacity={task.removed}
						class:opacity-0={task.removed}
						class:pointer-events-none={task.removed}
					>
						<Task
							index={ti}
							bind:updated={tasks[ti].updated}
							bind:title={tasks[ti].title}
							bind:emoji={tasks[ti].emoji}
							bind:days={tasks[ti].days}
						/>
						<Actions
							up={ti > 0}
							down={ti < task.length - 1 || ci < checkpoints.length - 1}
							on:up={() => moveTask(ti, -1)}
							on:down={() => moveTask(ti, 1)}
							on:remove={() => removeTask(ti)}
						/>
					</div>
					<Connector
						last={ti === checkpoint.toIndex}
						on:addCheckpoint={() => addCheckpoint(ci, ti + 1)}
						on:addTask={() => addTask(ti + 1)}
					/>
				{/if}
			{/each}
		{/each}
	</main>
</div>
