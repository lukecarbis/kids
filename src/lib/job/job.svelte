<script>
	import JobActive from '$lib/job/job-active.svelte';
	import JobDone from '$lib/job/job-done.svelte';
	import JobPending from '$lib/job/job-pending.svelte';

	export let job;
	export let active;
</script>

{#if active}
	<JobActive {job} />
{:else if job.done}
	<JobDone {job} />
{:else}
	<JobPending {job} />
{/if}
