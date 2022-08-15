<script>
	export let task;
</script>

<div
	class="p-4 bg-slate-50 border-2 rounded-lg flex flex-wrap border-slate-200 items-stretch justify-between rounded-lg"
>
	<span class="mr-4 text-center w-6 grayscale opacity-30">
		<em-emoji set="twitter" size="24px" native={task.emoji} />
	</span>
	<h3 class="flex-1 text-center text-slate-300 mr-10">
		{task.title}
	</h3>
</div>
