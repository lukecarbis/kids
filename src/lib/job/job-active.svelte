<script>
	import { emojiCode } from '$lib/helpers/emoji-code';
	import { queue } from '$lib/stores/queue';
	import { slide } from 'svelte/transition';
	import Skip from '$lib/job/buttons/skip.svelte';
	import Done from '$lib/job/buttons/done.svelte';
	export let job;
</script>

<div
	class="active p-4 border-2 flex flex-wrap bg-sky-100 border-sky-300 rounded-t-lg"
	transition:slide
>
	<span class="text-center w-full h-10 max-h-full text-4xl">
		<img class="max-h-full" src="/openmoji/{emojiCode(job.emoji)}.svg" alt={job.emoji} />
	</span>
	<h3 class="flex-auto text-center pt-2 text-2xl leading-10">
		{job.title}
	</h3>
	<p class="w-full py-2 text-center">{job.description}</p>
</div>

<div class="bg-white rounded-b-lg border-2 border-t-0 flex" transition:slide>
	{#if $queue.remaining > 1}
		<Skip />
	{/if}
	<Done />
</div>
