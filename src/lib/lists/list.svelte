<script>
	import Progress from '$lib/progress/progress.svelte';
	import Actions from '$lib/lists/actions.svelte';
	import Share from '$lib/lists/share.svelte';

	export let list = {
		name: '',
		slug: '',
		lastUpdated: '',
		checkpoints: [],
		totalTasks: 0,
		totalTasksRemaining: 0
	};

	$: name = list.name;
	$: slug = list.slug;
	$: lastUpdated = list.lastUpdated;
	$: checkpoints = list.checkpoints;
	$: totalTasks = list.totalTasks;
	$: totalTasksRemaining = list.totalTasksRemaining;
</script>

<div class="flex-grow w-full border-2 border-b-0 rounded-t-lg p-4">
	<div class="flex mb-6">
		<h2 class="block flex-grow font-bold">
			{name}
		</h2>
		<p class="text-slate-600 text-sm">
			<span class="hidden sm:inline">Completed</span>
			{totalTasks - totalTasksRemaining} / {totalTasks}
			tasks
		</p>
	</div>
	<Progress {list} />
</div>
{#if !lastUpdated}
	<Share {name} />
{/if}
<Actions {slug} />
