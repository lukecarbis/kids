import { writable } from 'svelte/store';

export const jobQueue = writable({
	jobs: [],
	active: 0,
	remaining: 0
});

export const getNextJob = (jobs) => {
	for (const [index, job] of jobs.entries()) {
		if (!job.skipped && !job.done) {
			return index;
		}
	}
	return -1;
};

export const getJobsRemaining = (jobs) => {
	let remaining = 0;
	for (const job of jobs) {
		if (!job.done) {
			remaining++;
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

export const setJobQueue = ( jobs) => {
	jobQueue.set({
		jobs: jobs,
		active: getNextJob(jobs),
		remaining: getJobsRemaining(jobs)
	})
}