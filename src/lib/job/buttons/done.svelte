<script>
	import {
		queue,
		getNextJob,
		getJobsRemaining,
		resetSkippedJobs,
		setQueue
	} from '$lib/stores/queue';
	import { updateJob } from '$lib/jobs';

	const done = () => {
		let jobs = [...$queue.jobs];

		jobs[$queue.active].done = true;
		updateJob($queue.active, { done: true });

		if (-1 === getNextJob(jobs, $queue.checkpoints)) {
			jobs = resetSkippedJobs(jobs);
		}

		if (!getJobsRemaining(jobs, $queue.checkpoints)) {
			const container = document.querySelector('#wrap');
			const checkpoint = document.querySelector('.checkpoint.locked');

			let top = container.scrollHeight;

			if (checkpoint) {
				top = checkpoint.offsetTop;
			}

			container.scrollTo({
				left: 0,
				top: top,
				behavior: 'smooth'
			});
		}

		setQueue(jobs);
	};
</script>

<button
	class="flex-auto border-l border-b active:pt-5 active:border-b-transparent py-4 px-8 h-16 leading-4 text-emerald-500"
	on:click={done}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6 inline-block mr-1 stroke-emerald-500"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
	</svg>
	Done
</button>
