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
		if (!isCheckpointOpen(checkpoints, checkpointIndex)) {
			continue;
		}
		for (const [taskIndex, task] of checkpoint.tasks.entries()) {
			if (!task.done && !task.skipped && task.visible) {
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
			return;
		}

		checkpoint.tasks.forEach((task) => {
			if (!task.done && task.visible) {
				remaining++;
			}
		});
	});

	return remaining;
};

export const getTotalTasks = (checkpoints) => {
	let tasks = 0;

	checkpoints.forEach((checkpoint) => {
		checkpoint.tasks.forEach((task) => {
			if (task.visible) {
				tasks++;
			}
		});
	});

	return tasks;
};

export const getTotalTasksRemaining = (checkpoints) => {
	let remaining = 0;

	checkpoints.forEach((checkpoint) => {
		checkpoint.tasks.forEach((task) => {
			if (!task.done && task.visible) {
				remaining++;
			}
		});
	});

	return remaining;
};

export const getLastTaskIndex = (checkpoint) => {
	for (let i = checkpoint.tasks.length - 1; i >= 0; i--) {
		if (checkpoint.tasks[i].visible) {
			return i;
		}
	}
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

	let nextTask = getNextTask(checkpoints);
	if (-1 === nextTask.task) {
		checkpoints = resetSkippedTasks(checkpoints);
		nextTask = getNextTask(checkpoints);
	}

	queue.set({
		name: name,
		id: id,
		checkpoints: checkpoints,
		activeCheckpoint: nextTask.checkpoint,
		activeTask: nextTask.task,
		remaining: getTasksRemaining(checkpoints),
		totalRemaining: getTotalTasksRemaining(checkpoints),
		totalTasks: getTotalTasks(checkpoints)
	});
};

export const resetCheckpoints = (checkpoints, lastUpdated) => {
	const day = new Date().getDay();
	const date = new Date().toLocaleDateString('sv');

	// Reset if the data is from a previous day.
	if (lastUpdated !== date) {
		checkpoints.forEach((checkpoint) => {
			checkpoint.visible = true;
			checkpoint.tasks.forEach((task) => {
				task.skipped = false;
				task.done = false;
				task.visible = true;
			});
		});
	}

	// Filter out tasks that aren't set for today.
	checkpoints.forEach((checkpoint) => {
		checkpoint.tasks = checkpoint.tasks.map((task) => {
			task.visible = task.days[day];
			return task;
		});
	});

	// Filter out checkpoints with no tasks.
	checkpoints = checkpoints.map((checkpoint) => {
		checkpoint.visible = getTotalTasks([checkpoint]);
		return checkpoint;
	});

	return checkpoints;
};

export const isCheckpointOpen = (checkpoints, checkpointIndex) => {
	if (!parseInt(checkpointIndex)) {
		return true;
	}

	const checkpoint = checkpoints[checkpointIndex];
	const previousCheckpoint = checkpoints[checkpointIndex - 1];

	const doneTasks = checkpoint.tasks.filter((task) => {
		return task.done;
	});

	// Unlock the checkpoint if it already contains done tasks.
	if (doneTasks.length) {
		return true;
	}

	const previousDoneTasks = previousCheckpoint.tasks.filter((task) => {
		return !task.visible || task.done;
	});

	return (
		get(hour) >= checkpoint.hour && previousDoneTasks.length === previousCheckpoint.tasks.length
	);
};
