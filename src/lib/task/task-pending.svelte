<script>
	import data from '@emoji-mart/data/sets/14/twitter.json';
	import { init } from 'emoji-mart';
	import Select from '$lib/task/buttons/select.svelte';
	export let task;
	export let taskIndex;
	export let checkpointIndex;
	init({ data });
</script>

<div
	class="px-4 py-2 border-2 rounded-lg flex flex-wrap border-slate-200 items-stretch justify-between rounded-lg snap-always snap-start scroll-mt-6"
>
	<span class="mr-4 text-center w-6 h-10 py-2">
		<em-emoji set="twitter" size="24px" native={task.emoji} />
	</span>
	<h3 class="flex-auto text-center mr-10 leading-10">
		{task.title}
	</h3>
	{#if task.skipped}
		<Select {taskIndex} {checkpointIndex} />
	{/if}
</div>
