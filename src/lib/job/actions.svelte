<script>
	import Move from '$lib/job/buttons/move.svelte';
	export let index;
	export let up = true;
	export let down = true;
</script>

<div class="flex flex-wrap flex-1 gap-2 items-center content-start">
	<Move {index} direction="up" disabled={up} />
	<Move {index} direction="down" disabled={down} />
</div>
