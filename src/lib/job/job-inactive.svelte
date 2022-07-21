<script>
	import { emojiCode } from '$lib/helpers/emoji-code.js';
	export let job;
</script>

<div
	class="px-4 py-2 bg-slate-50 border-2 rounded-lg flex flex-wrap border-slate-200 items-stretch justify-between rounded-lg snap-always snap-start scroll-mt-6"
>
	<span class="mr-4 text-center w-6 h-10 py-2 grayscale opacity-30">
		<img src="/openmoji/{emojiCode(job.emoji)}.svg" alt={job.emoji} />
	</span>
	<h3 class="flex-auto text-center text-slate-300 mr-10 leading-10">
		{job.title}
	</h3>
</div>
