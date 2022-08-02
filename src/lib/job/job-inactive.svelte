<script>
	import data from '@emoji-mart/data/sets/14/twitter.json'
	import { init } from 'emoji-mart'
	export let job;

	init({ data });
</script>

<div
	class="px-4 py-2 bg-slate-50 border-2 rounded-lg flex flex-wrap border-slate-200 items-stretch justify-between rounded-lg snap-always snap-start scroll-mt-6"
>
	<span class="mr-4 text-center w-6 h-10 py-2 grayscale opacity-30">
		<em-emoji set="twitter" size="24px" native={job.emoji} />
	</span>
	<h3 class="flex-auto text-center text-slate-300 mr-10 leading-10">
		{job.title}
	</h3>
</div>
