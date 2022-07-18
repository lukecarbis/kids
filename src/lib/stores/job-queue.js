import { get, writable } from 'svelte/store';

export const jobQueue = writable({
	jobs: [],
	checkpoints: [],
	active: 0,
	remaining: 0
});

export const getNextJob = (jobs, checkpoints) => {
	const hour = 9;
	for (const checkpoint of checkpoints) {
		if ( hour < checkpoint.hour ) {
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
	const hour = 9;
	let remaining = 0;

	for (const checkpoint of checkpoints) {
		if ( hour < checkpoint.hour ) {
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

export const resetSkippedJobs = (jobs) => {
	for (let index = 0; index < jobs.length; index++) {
		jobs[index].skipped = false;
	}
	return jobs;
};

export const setJobQueue = (jobs, checkpoints = false) => {
	if (!checkpoints) {
		checkpoints = get(jobQueue).checkpoints;
	}
	jobQueue.set({
		jobs: jobs,
		checkpoints: checkpoints,
		active: getNextJob(jobs, checkpoints),
		remaining: getJobsRemaining(jobs, checkpoints)
	});
};
