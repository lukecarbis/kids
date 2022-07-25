<script>
	import { queue, getNextJob, resetSkippedJobs, setQueue } from '$lib/stores/queue.js';

	const skip = () => {
		let jobs = [...$queue.jobs];

		jobs[$queue.active].skipped = true;

		if (-1 === getNextJob(jobs, $queue.checkpoints)) {
			jobs = resetSkippedJobs(jobs);
		}

		setQueue(jobs);
	};
</script>

<button
	class="py-4 px-8 h-16 border-r border-b active:border-b-transparent active:pt-5 leading-4 text-sky-500 align-bottom"
	on:click={skip}
>
	Skip
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6 inline-block ml-1 stroke-sky-500 "
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
	</svg>
</button>
