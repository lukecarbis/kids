<script>
	import Progress from '$lib/progress/progress.svelte';
	import Actions from '$lib/lists/actions.svelte';
	import Share from '$lib/lists/share.svelte';
	export let name = '';
	export let slug = '';
	export let seen = false;
	export let queue = {
		checkpoints: [],
		totalTasks: 0,
		totalRemaining: 0
	};
</script>

<div class="flex-grow w-full border-2 border-b-0 rounded-t-lg p-4">
	<div class="flex mb-6">
		<h2 class="block flex-grow font-bold">
			{name}
		</h2>
		<p class="text-slate-600 text-sm">
			<span class="hidden sm:inline">Completed</span>
			{queue.totalTasks - queue.totalRemaining} / {queue.totalTasks}
			tasks
		</p>
	</div>
	<Progress
		checkpoints={queue.checkpoints}
		totalTasks={queue.totalTasks}
		totalRemaining={queue.totalRemaining}
	/>
</div>
{#if !seen}
	<Share {name} />
{/if}
<Actions {slug} />
