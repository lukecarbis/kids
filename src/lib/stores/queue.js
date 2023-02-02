import { hour } from '$lib/stores/time';
import { get } from 'svelte/store';

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

export const totalTasksRemainingInCheckpoint = (checkpoint) => {
	let total = 0;

	checkpoint.tasks.forEach((task) => {
		if (!task.done && task.visible) {
			total++;
		}
	});

	return total;
};

export const totalTasksRemaining = (checkpoints) => {
	let total = 0;

	checkpoints.forEach((checkpoint) => {
		total += totalTasksRemainingInCheckpoint(checkpoint);
	});

	return total;
};

export const totalTasksInCheckpoint = (checkpoint) => {
	let total = 0;

	checkpoint.tasks.forEach((task) => {
		if (task.visible) {
			total++;
		}
	});

	return total;
};

export const totalTasks = (checkpoints) => {
	let tasks = 0;

	checkpoints.forEach((checkpoint) => {
		tasks += totalTasksInCheckpoint(checkpoint);
	});

	return tasks;
};

export const totalActiveTasksRemaining = (checkpoints) => {
	let total = 0;

	checkpoints.forEach((checkpoint, checkpointIndex) => {
		if (!isCheckpointOpen(checkpoints, checkpointIndex)) {
			return;
		}
		checkpoint.tasks.forEach((task) => {
			if (!task.done && task.visible) {
				total++;
			}
		});
	});

	return total;
};

export const getLastTaskIndex = (checkpoint) => {
	for (let i = checkpoint.tasks.length - 1; i >= 0; i--) {
		if (checkpoint.tasks[i].visible) {
			return i;
		}
	}
};

const getFirstDisabledCheckpoint = (checkpoints) => {
	for (const checkpointIndex of checkpoints.keys()) {
		if (isCheckpointOpen(checkpoints, checkpointIndex)) {
			continue;
		}
		return checkpointIndex;
	}

	return -1;
};

export const isCheckpointOpen = (checkpoints, checkpointIndex) => {
	if (!parseInt(checkpointIndex)) {
		return true;
	}

	const checkpoint = checkpoints[checkpointIndex];

	const doneTasks = checkpoint.tasks.filter((task) => {
		return task.done;
	});

	// Unlock the checkpoint if it already contains done tasks.
	if (doneTasks.length) {
		return true;
	}

	return isCheckpointUnlocked(checkpoint);
};

export const isCheckpointUnlocked = (checkpoint) => {
	return get(hour) >= checkpoint.hour;
};

export const resetCheckpoints = (checkpoints) => {
	checkpoints.forEach((checkpoint) => {
		checkpoint.visible = true;
		checkpoint.tasks.forEach((task) => {
			task.skipped = false;
			task.done = false;
			task.visible = true;
		});
	});

	return checkpoints;
};

export const getQueue = (checkpoints) => {
	let nextTask = getNextTask(checkpoints);

	return {
		activeCheckpoint: nextTask.checkpoint,
		activeTask: nextTask.task,
		totalTasksRemaining: totalTasksRemaining(checkpoints),
		totalActiveTasksRemaining: totalActiveTasksRemaining(checkpoints),
		totalTasks: totalTasks(checkpoints),
		firstDisabledCheckpoint: getFirstDisabledCheckpoint(checkpoints)
	};
};

export const getCheckpoints = (checkpoints) => {
	const day = new Date().getDay();

	// Filter out tasks that aren't set for today.
	checkpoints.forEach((checkpoint) => {
		checkpoint.tasks = checkpoint.tasks.map((task) => {
			task.visible = task.days[day];
			return task;
		});
	});

	// Add additional checkpoint info.
	checkpoints = checkpoints.map((checkpoint, index) => {
		checkpoint.visible = !!totalTasksInCheckpoint(checkpoint);
		checkpoint.lastTask = getLastTaskIndex(checkpoint);
		checkpoint.open = isCheckpointOpen(checkpoints, index);
		checkpoint.unlocked = isCheckpointUnlocked(checkpoints, index);
		checkpoint.totalTasksRemaining = totalTasksRemainingInCheckpoint(checkpoint);
		checkpoint.totalTasks = totalTasksInCheckpoint(checkpoint);
		return checkpoint;
	});

	return checkpoints;
};
