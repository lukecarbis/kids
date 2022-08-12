<script>
	export let slug = '';
</script>

<div class="flex-grow flex w-full border-2 border-b rounded-b-lg text-center mb-8 overflow-hidden">
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
