<script>
	import JobActive from '$lib/job/job-active.svelte';
	import JobDone from '$lib/job/job-done.svelte';
	import JobPending from '$lib/job/job-pending.svelte';

	export let job;
	export let active;
	export let index;
</script>

{#if active}
	<JobActive {job} on:skip on:done />
{:else if job.done}
	<JobDone {job} {index} on:revert />
{:else}
	<JobPending {job} {index} on:select />
{/if}
