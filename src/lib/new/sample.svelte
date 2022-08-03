<script>
	export let useSampleData;
</script>

<label for="use-sample-data" class="w-full flex relative items-center cursor-pointer mb-6">
	<input type="checkbox" bind:checked={useSampleData} id="use-sample-data" class="sr-only peer" />
	<div
		class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-400"
	/>
	<span class="ml-3 text-slate-800">Use Sample Data</span>
</label>
