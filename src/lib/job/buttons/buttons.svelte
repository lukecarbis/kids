<script>
	import { queue } from '$lib/stores/queue';
	import Skip from '$lib/job/buttons/skip.svelte';
	import Done from '$lib/job/buttons/done.svelte';
	import { slide } from 'svelte/transition';
</script>

<div class="bg-white rounded-b-lg border-2 border-t-0 flex" transition:slide>
	{#if $queue.remaining > 1}
		<Skip />
	{/if}
	<Done />
</div>
