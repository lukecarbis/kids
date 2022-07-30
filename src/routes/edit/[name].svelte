<script>
	import Actions from '$lib/job/actions.svelte';
	import Checkpoint from '$lib/checkpoint/checkpoint-edit.svelte';
	import Connector from '$lib/job/connector-edit.svelte';
	import Job from '$lib/job/job-edit.svelte';
	import Nav from '$lib/nav/nav-edit.svelte';

	export let name;
	export let checkpoints;
	export let jobs;

	let editMode = false;
</script>

<Nav title={name} back="/edit" on:more={() => (editMode = !editMode)} />

<div id="wrap" class="mt-16 pb-8 font-mono select-none">
	<main class="max-w-screen-sm pt-6 mx-auto px-6 relative">
		{#each checkpoints as checkpoint}
			<div class="checkpoint flex gap-4">
				<Checkpoint {checkpoint} />

				<Actions
					index={checkpoint.fromIndex}
					up={!checkpoint.fromIndex}
					down={!checkpoint.fromIndex || checkpoint.fromIndex >= jobs.length - 1}
				/>
			</div>

			<Connector />

			{#each jobs as job, index}
				{#if index >= checkpoint.fromIndex && index <= checkpoint.toIndex}
					<Job {job} {index} total={jobs.length} />
					<Connector />
				{/if}
			{/each}
		{/each}
	</main>
</div>
