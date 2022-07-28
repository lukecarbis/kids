<script>
	import { queue, setQueue, isCheckpointOpen } from '$lib/stores/queue';
	import CheckpointActive from '$lib/checkpoint/checkpoint-active.svelte';
	import CheckpointLocked from '$lib/checkpoint/checkpoint-locked.svelte';
	import Connector from '$lib/job/connector.svelte';
	import JobActive from '$lib/job/job-active.svelte';
	import JobDone from '$lib/job/job-done.svelte';
	import JobInactive from '$lib/job/job-inactive.svelte';
	import JobPending from '$lib/job/job-pending.svelte';
	import NavApp from '$lib/header/nav-app.svelte';
	import Progress from '$lib/progress/progress.svelte';
	import UpNext from '$lib/job/up-next.svelte';
	import { slide } from 'svelte/transition';

	export let name;
	export let streak;
	export let checkpoints;
	export let jobs;

	setQueue(jobs, checkpoints, name);
</script>

<NavApp {name} {streak} />

<div
	id="wrap"
	class="h-calc mt-16 pb-8 font-mono select-none overflow-y-scroll snap-y snap-mandatory"
>
	<main class="max-w-screen-sm mx-auto px-6 relative" out:slide>
		{#each $queue.checkpoints as checkpoint}
			{#if isCheckpointOpen(checkpoint)}
				<CheckpointActive {checkpoint} />
			{:else}
				<CheckpointLocked {checkpoint} />
			{/if}

			{#each $queue.jobs as job, index}
				{#if index >= checkpoint.fromIndex && index <= checkpoint.toIndex}
					{#if index === $queue.active && index !== checkpoint.fromIndex}
						<UpNext />
					{/if}

					{#if !isCheckpointOpen(checkpoint)}
						<JobInactive {job} />
					{:else if index === $queue.active}
						<JobActive {job} />
					{:else if job.done}
						<JobDone {job} {index} />
					{:else}
						<JobPending {job} {index} />
					{/if}

					{#if index !== checkpoint.toIndex}
						<Connector done={job.done && index !== checkpoint.toIndex} />
					{/if}
				{/if}
			{/each}
		{/each}
	</main>
</div>

<Progress />

<style>
	.h-calc {
		height: calc(100vh - 8rem);
	}
</style>
