<script>
	import Connector from '$lib/connector/connector.svelte';
	import { slide } from 'svelte/transition';
</script>

<div class="up-next text-center text-sky-500 font-bold z-0" transition:slide>
	<p class="bg-white py-2">Up next:</p>
</div>
<Connector />
