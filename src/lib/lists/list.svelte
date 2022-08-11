<script>
	import Progress from '$lib/progress/progress.svelte';
	export let name = '';
	export let slug = '';
	export let queue = {
		checkpoints: [],
		totalTasks: 0,
		totalRemaining: 0
	};
</script>

<div class="flex-grow w-full border-2 rounded-t-lg p-4">
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
<div
	class="flex-grow flex w-full border-2 border-b border-t-0 rounded-b-lg text-center mb-8 overflow-hidden"
>
	<a href="#" class="flex-grow border-r border-b py-3 px-4 text-sm relative cursor-default">
		<span class="block text-slate-300">Show Progress</span>
	</a>
	<a
		href="/edit/{slug}"
		class="flex-grow border-x border-b py-3 px-4 text-sm relative active:top-px active:border-b-transparent"
	>
		Edit
	</a>
	<a
		href="/share/{slug}"
		class="flex-grow border-l border-b py-3 px-4 text-sm relative active:top-px active:border-b-transparent"
	>
		Share
	</a>
</div>
