<script>
	import CheckpointActive from '$lib/checkpoint/checkpoint-active.svelte';
	import Connector from '$lib/job/connector.svelte';
	import JobPending from '$lib/job/job-pending.svelte';
	import NavMain from '$lib/header/nav-main.svelte';

	export let name;
	export let checkpoints;
	export let jobs;
</script>

<NavMain />

<div id="wrap" class="mt-16 pb-8 font-mono select-none">
	<main class="max-w-screen-sm pt-4 mx-auto px-6 relative">
		{name}

		{#each checkpoints as checkpoint}
			<CheckpointActive {checkpoint} />

			{#each jobs as job, index}
				{#if index >= checkpoint.fromIndex && index <= checkpoint.toIndex}
					<JobPending {job} {index} />
					{#if index !== checkpoint.toIndex}
						<Connector done={job.done && index !== checkpoint.toIndex} />
					{/if}
				{/if}
			{/each}
		{/each}
	</main>
</div>
