<script>
	import Select from '$lib/task/buttons/select.svelte';
	export let task;
	export let disabled;
</script>

<div
	class="p-4 border-2 rounded-lg flex flex-wrap border-slate-200 items-stretch justify-between rounded-lg"
>
	<span class="mr-4 text-center w-6">
		<em-emoji set="twitter" size="24px" native={task.emoji} />
	</span>
	<h3 class="flex-1 text-center mr-10">
		{task.title}
	</h3>
	{#if task.skipped}
		<Select on:select {disabled} />
	{/if}
</div>
