<script>
	import { jobQueue, setJobQueue } from '$lib/stores/job-queue.js';
	import CheckpointActive from '$lib/checkpoint/checkpoint-active.svelte';
	import CheckpointLocked from '$lib/checkpoint/checkpoint-locked.svelte';
	import Connector from '$lib/job/connector.svelte';
	import JobActive from '$lib/job/job-active.svelte';
	import JobDone from '$lib/job/job-done.svelte';
	import JobInactive from '$lib/job/job-inactive.svelte';
	import JobPending from '$lib/job/job-pending.svelte';
	import Nav from '$lib/nav/nav.svelte';
	import UpNext from '$lib/job/up-next.svelte';

	export let name;
	export let checkpoints;
	export let jobs;

	setJobQueue(jobs, checkpoints);

	const nickname = name[0].toUpperCase() + name.substring(1);
	const hour = 9//new Date().getHours();
</script>

<Nav name={nickname} streak="31" />

<main class="max-w-screen-sm mx-auto px-6 relative">
	{#each $jobQueue.checkpoints as checkpoint}

		{#if hour >= checkpoint.hour}
			<CheckpointActive {checkpoint} />
		{:else}
			<CheckpointLocked {checkpoint} />
		{/if}

		{#each $jobQueue.jobs as job, index}
			{#if index >= checkpoint.fromIndex && index <= checkpoint.toIndex}
				{#if index === $jobQueue.active && index !== checkpoint.fromIndex}
					<UpNext />
				{/if}

				{#if hour < checkpoint.hour}
					<JobInactive {job} />
				{:else if index === $jobQueue.active}
					<JobActive {job} />
				{:else if job.done}
					<JobDone {job} {index} />
				{:else}
					<JobPending {job} {index} />
				{/if}

				{#if index !== $jobQueue.jobs.length - 1}
					<Connector
						done={job.done && (!$jobQueue.jobs[index + 1] || $jobQueue.jobs[index + 1].done)}
					/>
				{/if}
			{/if}
		{/each}
	{/each}

	{#if !$jobQueue.remaining}
		<div class="text-center text-emerald-500 font-bold z-0 snap-normal">
			<p class="bg-white pt-3 text-lg">That's all for now!</p>
			<p class="bg-white py-2">Check back later for more.</p>
		</div>
	{/if}
</main>
