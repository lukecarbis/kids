import { lists } from '$lib/stores/lists';
import { hour } from '$lib/stores/time';
import { derived, get } from 'svelte/store';

export const queues = derived(
	lists,
	($lists) => {
		const queues = {};
		Object.entries($lists).forEach(([listId, list]) => {
			queues[list.slug] = getQueue(list.checkpoints, list.name, listId);
		});
		return queues;
	},
	[]
);

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

export const resetSkippedTasks = (checkpoints) => {
	for (const checkpoint of checkpoints) {
		for (let index = 0; index < checkpoint.tasks.length; index++) {
			checkpoint.tasks[index].skipped = false;
		}
	}
	return checkpoints;
};

export const resetQueue = (checkpoints, lastUpdated) => {
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
		checkpoint.visible = !!getTotalTasks([checkpoint]);
		return checkpoint;
	});

	return checkpoints;
};

export const getQueue = (checkpoints, name, id) => {
	let nextTask = getNextTask(checkpoints);
	if (-1 === nextTask.task) {
		checkpoints = resetSkippedTasks(checkpoints);
		nextTask = getNextTask(checkpoints);
	}

	return {
		name: name,
		id: id,
		activeCheckpoint: nextTask.checkpoint,
		activeTask: nextTask.task,
		remaining: getTasksRemaining(checkpoints),
		totalRemaining: getTotalTasksRemaining(checkpoints),
		totalTasks: getTotalTasks(checkpoints)
	};
};
