<script>
	export let name = '';
</script>

<div class="flex-grow w-full border-2 rounded-lg p-6 text-center mb-6">
	<h2 class="block w-full mb-4">
		{name}
	</h2>
	<a
		href="/{name}"
		class="py-2 px-6 inline-block w-1/2 text-center font-bold border-2 border-b-4 border-sky-600 bg-sky-400 text-white rounded-lg w-full active:border-b-2 active:mt-px active:mb-px"
		>Show List
	</a>
</div>
