<script>
	import Add from '$lib/job/buttons/add.svelte';
	export let last = false;
</script>

<div class="mr-14">
	<span class="border-l-2 w-0 h-4 block m-auto text-center normal" />
	<Add on:addTask on:addCheckpoint />
	{#if !last}
		<span class="border-l-2 w-0 h-4 block m-auto text-center normal" />
	{/if}
</div>
