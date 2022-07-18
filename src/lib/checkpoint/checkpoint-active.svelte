<script>
	import { jobQueue } from '$lib/stores/job-queue.js';
	import Connector from '$lib/job/connector.svelte';
	export let checkpoint
</script>

<div
	class="checkpoint mt-6 mb-2 text-center z-0 snap-always snap-start scroll-mt-6"
	class:up-next={$jobQueue.active === checkpoint.fromIndex}
>
	<p class="bg-white text-sky-500 font-bold text-xl py-2">{checkpoint.title}</p>
	<p class="bg-white py-2">{checkpoint.description}</p>
</div>

<Connector />
