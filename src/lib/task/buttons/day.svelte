<script>
	export let letter;
	export let enabled = false;
	export let first = false;
	export let last = false;
</script>

<button
	class="px-2 py-1 w-10 h-10 bg-white flex-1 text-sm border border-b-2 active:mt-px active:border-b transition-all"
	class:bg-sky-400={enabled}
	class:border-sky-400={enabled}
	class:text-white={enabled}
	class:border-b-sky-600={enabled}
	class:border-r-sky-300={enabled}
	class:rounded-l-lg={first}
	class:rounded-r-lg={last}
	class:border-r-sky-400={last && enabled}
	on:click={() => (enabled = !enabled)}
>
	{letter}
</button>
