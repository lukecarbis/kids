<script>
	import { slide } from 'svelte/transition';
	import Skip from '$lib/task/buttons/skip.svelte';
	import Done from '$lib/task/buttons/done.svelte';
	export let task;
	export let totalActiveTasksRemaining;
	export let disabled;
</script>

<div
	class="active p-4 border-2 flex flex-wrap bg-sky-100 border-sky-300 rounded-t-lg"
	transition:slide
>
	<span class="text-center w-full h-10 max-h-full text-4xl mb-2">
		<em-emoji set="twitter" size="40px" native={task.emoji} />
	</span>
	<h3 class="flex-auto text-center pt-2 text-2xl leading-10">
		{task.title}
	</h3>
	<p class="w-full py-2 text-center">{task.description}</p>
</div>

<div class="bg-white rounded-b-lg border-2 border-t-0 flex" transition:slide>
	{#if totalActiveTasksRemaining > 1}
		<Skip on:skip {disabled} />
	{/if}
	<Done on:done {disabled} />
</div>
