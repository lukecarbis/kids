import { hour } from '$lib/stores/time';
import { get, writable } from 'svelte/store';

export const queue = writable({
	jobs: [],
	checkpoints: [],
	active: 0,
	remaining: 0,
	totalRemaining: 0
});

export const getNextJob = (jobs, checkpoints) => {
	for (const checkpoint of checkpoints) {
		if (!isCheckpointOpen(checkpoint)) {
			continue;
		}
		for (const [index, job] of jobs.entries()) {
			if (index >= checkpoint.fromIndex && index <= checkpoint.toIndex) {
				if (!job.skipped && !job.done) {
					return index;
				}
			}
		}
	}
	return -1;
};

export const getJobsRemaining = (jobs, checkpoints) => {
	let remaining = 0;

	for (const checkpoint of checkpoints) {
		if (!isCheckpointOpen(checkpoint)) {
			continue;
		}
		for (const [index, job] of jobs.entries()) {
			if (index >= checkpoint.fromIndex && index <= checkpoint.toIndex) {
				if (!job.done) {
					remaining++;
				}
			}
		}
	}

	return remaining;
};

export const getTotalJobsRemaining = (jobs, checkpoints) => {
	let remaining = 0;

	for (const checkpoint of checkpoints) {
		for (const [index, job] of jobs.entries()) {
			if (index >= checkpoint.fromIndex && index <= checkpoint.toIndex) {
				if (!job.done) {
					remaining++;
				}
			}
		}
	}

	return remaining;
};

export const resetSkippedJobs = (jobs) => {
	for (let index = 0; index < jobs.length; index++) {
		jobs[index].skipped = false;
	}
	return jobs;
};

export const setQueue = (jobs, checkpoints = false) => {
	if (!checkpoints) {
		checkpoints = get(queue).checkpoints;
	}
	queue.set({
		jobs: jobs,
		checkpoints: checkpoints,
		active: getNextJob(jobs, checkpoints),
		remaining: getJobsRemaining(jobs, checkpoints),
		totalRemaining: getTotalJobsRemaining(jobs, checkpoints)
	});
};

export const isCheckpointOpen = (checkpoint) => {
	const jobs = get(queue).jobs.slice(0, checkpoint.toIndex - 1);

	const doneJobs = jobs.filter((job) => {
		return job.done;
	});

	return get(hour) >= checkpoint.hour && doneJobs.length >= checkpoint.fromIndex;
};
