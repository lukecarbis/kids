import { hour } from '$lib/stores/time';
import { get, writable } from 'svelte/store';

export const queue = writable({
	name: '',
	tasks: [],
	checkpoints: [],
	active: 0,
	remaining: 0,
	totalRemaining: 0
});

export const getNextTask = (tasks, checkpoints) => {
	for (const checkpoint of checkpoints) {
		if (!isCheckpointOpen(checkpoint)) {
			continue;
		}
		for (const [index, task] of tasks.entries()) {
			if (index >= checkpoint.fromIndex && index <= checkpoint.toIndex) {
				if (!task.skipped && !task.done) {
					return index;
				}
			}
		}
	}
	return -1;
};

export const getTasksRemaining = (tasks, checkpoints) => {
	let remaining = 0;

	for (const checkpoint of checkpoints) {
		if (!isCheckpointOpen(checkpoint)) {
			continue;
		}
		for (const [index, task] of tasks.entries()) {
			if (index >= checkpoint.fromIndex && index <= checkpoint.toIndex) {
				if (!task.done) {
					remaining++;
				}
			}
		}
	}

	return remaining;
};

export const getTotalTasksRemaining = (tasks, checkpoints) => {
	let remaining = 0;

	for (const checkpoint of checkpoints) {
		for (const [index, task] of tasks.entries()) {
			if (index >= checkpoint.fromIndex && index <= checkpoint.toIndex) {
				if (!task.done) {
					remaining++;
				}
			}
		}
	}

	return remaining;
};

export const resetSkippedTasks = (tasks) => {
	for (let index = 0; index < tasks.length; index++) {
		tasks[index].skipped = false;
	}
	return tasks;
};

export const setQueue = (tasks, checkpoints = false, name = false) => {
	if (!checkpoints) {
		checkpoints = get(queue).checkpoints;
	}
	if (!name) {
		name = get(queue).name;
	}
	queue.set({
		name: name,
		tasks: tasks,
		checkpoints: checkpoints,
		active: getNextTask(tasks, checkpoints),
		remaining: getTasksRemaining(tasks, checkpoints),
		totalRemaining: getTotalTasksRemaining(tasks, checkpoints)
	});
};

export const isCheckpointOpen = (checkpoint) => {
	const tasks = get(queue).tasks.slice(0, checkpoint.toIndex - 1);

	const doneTasks = tasks.filter((task) => {
		return task.done;
	});

	return get(hour) >= checkpoint.hour && doneTasks.length >= checkpoint.fromIndex;
};
