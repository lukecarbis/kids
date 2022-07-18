<script>
	import { jobQueue, setJobQueue } from '$lib/stores/job-queue.js';
	import Connector from '$lib/job/connector.svelte';
	import JobActive from '$lib/job/job-active.svelte';
	import JobDone from '$lib/job/job-done.svelte';
	import JobPending from '$lib/job/job-pending.svelte';
	import Nav from '$lib/nav/nav.svelte';
	import UpNext from '$lib/job/up-next.svelte';

	export let name;
	export let jobs;

	setJobQueue(jobs);

	const nickname = name[0].toUpperCase() + name.substring(1);
</script>

<Nav name={nickname} streak="31" />

<main class="max-w-screen-sm mx-auto p-6 relative">
	{#each $jobQueue.jobs as job, index}
		{#if index === $jobQueue.active}
			<UpNext />
		{/if}

		{#if index === $jobQueue.active}
			<JobActive {job} />
		{:else if job.done}
			<JobDone {job} {index} />
		{:else}
			<JobPending {job} {index} />
		{/if}

		{#if index !== $jobQueue.jobs.length - 1 || !$jobQueue.remaining}
			<Connector
				done={job.done && (!$jobQueue.jobs[index + 1] || $jobQueue.jobs[index + 1].done)}
			/>
		{/if}
	{/each}

	{#if !$jobQueue.remaining}
		<div class="text-center text-emerald-500 font-bold z-0 snap-normal">
			<p class="bg-white pt-3 text-lg">That's all for now!</p>
			<p class="bg-white py-2">Check back later for more.</p>
		</div>
	{/if}
</main>
