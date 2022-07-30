<script>
	import Move from '$lib/job/buttons/move.svelte';
	import Remove from '$lib/job/buttons/remove.svelte';
	export let up = false;
	export let down = true;
	export let remove = true;
</script>

<div class="flex flex-wrap flex-1 gap-2 items-center content-start">
	<Move on:up direction="up" disabled={!up} />
	<Move on:down direction="down" disabled={!down} />
	<Remove on:remove disabled={!remove} />
</div>
