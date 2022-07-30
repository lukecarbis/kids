<script>
	export let letter;
	export let enabled = false;
</script>

<button
	class="px-2 py-1 w-full flex-1 border border-b-2 rounded-lg active:mt-px active:border-b transition-colors"
	class:bg-sky-400={enabled}
	class:border-sky-600={enabled}
	class:text-white={enabled}
	class:border-transparent={enabled}
	class:border-b-sky-600={enabled}
	on:click={() => (enabled = !enabled)}
>
	{letter}
</button>
