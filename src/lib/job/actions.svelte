<script>
	import Move from '$lib/job/buttons/move.svelte';
	import Remove from '$lib/job/buttons/remove.svelte';
	export let index;
	export let up = false;
	export let down = true;
	export let remove = true;
</script>

<div class="flex flex-wrap flex-1 gap-2 items-center content-start">
	<Move {index} direction="up" disabled={!up} />
	<Move {index} direction="down" disabled={!down} />
	<Remove {index} disabled={!remove} />
</div>
