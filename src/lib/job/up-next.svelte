<script>
	import Connector from '$lib/job/connector.svelte';
	import { slide } from 'svelte/transition';
</script>

<div
	class="up-next text-center text-sky-500 font-bold z-0 snap-always snap-start scroll-mt-6"
	transition:slide
>
	<p class="bg-white py-2">Up next:</p>
</div>
<Connector />
