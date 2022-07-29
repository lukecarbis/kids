<script>
	import Checkpoint from '$lib/checkpoint/checkpoint-edit.svelte';
	import Connector from '$lib/job/connector.svelte';
	import Job from '$lib/job/job-edit.svelte';
	import Nav from '$lib/header/nav-edit.svelte';

	export let name;
	export let checkpoints;
	export let jobs;
</script>

<Nav {name} />

<div id="wrap" class="mt-16 pb-8 font-mono select-none">
	<main class="max-w-screen-sm pt-6 mx-auto px-6 relative">
		{#each checkpoints as checkpoint}
			<Checkpoint {checkpoint} />

			{#each jobs as job, index}
				{#if index >= checkpoint.fromIndex && index <= checkpoint.toIndex}
					<Job {job} {index} />
					<Connector done={job.done && index !== checkpoint.toIndex} />
				{/if}
			{/each}
		{/each}
	</main>
</div>
