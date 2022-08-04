import empty from '$lib/empty.json';
import { hour } from '$lib/stores/time';
import { get, writable } from 'svelte/store';

export const queue = writable({
	name: '',
	id: '',
	checkpoints: empty.checkpoints,
	activeCheckpoint: 0,
	activeTask: 0,
	remaining: 0,
	totalRemaining: 0,
	totalTasks: 0
});

export const getNextTask = (checkpoints) => {
	for (const [checkpointIndex, checkpoint] of checkpoints.entries()) {
		if (!isCheckpointOpen(checkpoints, checkpoint)) {
			continue;
		}
		for (const [taskIndex, task] of checkpoint.tasks.entries()) {
			if (!task.done && !task.skipped) {
				return { checkpoint: checkpointIndex, task: taskIndex };
			}
		}
	}
	return { checkpoint: -1, task: -1 };
};

export const getTasksRemaining = (checkpoints) => {
	let remaining = 0;

	checkpoints.forEach((checkpoint, index) => {
		if (!isCheckpointOpen(checkpoints, index)) {
			return false;
		}

		checkpoint.tasks.forEach((task) => {
			if (!task.done) {
				remaining++;
			}
		});
	});

	return remaining;
};

export const getTotalTasks = (checkpoints) => {
	let tasks = 0;

	for (const checkpoint of checkpoints) {
		tasks += checkpoint.tasks.length;
	}

	return tasks;
};

export const getTotalTasksRemaining = (checkpoints) => {
	let remaining = 0;

	for (const checkpoint of checkpoints) {
		for (const task of checkpoint.tasks.entries()) {
			if (!task.done) {
				remaining++;
			}
		}
	}

	return remaining;
};

export const resetSkippedTasks = (checkpoints) => {
	for (const checkpoint of checkpoints) {
		for (let index = 0; index < checkpoint.tasks.length; index++) {
			checkpoint.tasks[index].skipped = false;
		}
	}
	return checkpoints;
};

export const setQueue = (checkpoints, name = false, id = false) => {
	if (!name) {
		name = get(queue).name;
	}

	if (!id) {
		id = get(queue).id;
	}

	queue.set({
		name: name,
		id: id,
		checkpoints: checkpoints,
		activeCheckpoint: getNextTask(checkpoints).checkpoint,
		activeTask: getNextTask(checkpoints).task,
		remaining: getTasksRemaining(checkpoints),
		totalRemaining: getTotalTasksRemaining(checkpoints),
		totalTasks: getTotalTasks(checkpoints)
	});
};

export const isCheckpointOpen = (checkpoints, checkpointIndex) => {
	if (!parseInt(checkpointIndex)) {
		return true;
	}

	const checkpoint = checkpoints[checkpointIndex];
	const previousCheckpoint = checkpoints[checkpointIndex - 1];

	const doneTasks = previousCheckpoint.tasks.filter((task) => {
		return task.done;
	});

	return get(hour) >= checkpoint.hour && doneTasks.length === previousCheckpoint.tasks.length;
};
