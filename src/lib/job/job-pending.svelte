<script>
	import { emojiCode } from '$lib/helpers/emoji-code.js';
	import Select from '$lib/job/buttons/select.svelte';
	import { fade } from 'svelte/transition';
	export let job;
	export let index;
</script>

<div
	class="px-4 py-2 border-2 rounded-lg flex flex-wrap border-slate-200 items-stretch justify-between rounded-lg snap-always snap-start scroll-mt-6"
	in:fade
>
	<span class="mr-4 text-center w-6 h-10 py-2">
		<img src="/openmoji/{emojiCode(job.emoji)}.svg" alt={job.emoji} />
	</span>
	<h3 class="flex-auto text-center mr-10 leading-10">
		{job.title}
	</h3>
	{#if job.skipped}
		<Select {index} />
	{/if}
</div>
