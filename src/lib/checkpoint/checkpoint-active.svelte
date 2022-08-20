<script>
	import { slide } from 'svelte/transition';
	export let checkpoint;
</script>

<div class="checkpoint mt-6 mb-2 text-center z-0" transition:slide>
	<p class="bg-white text-sky-500 font-bold text-xl py-2">{checkpoint.title}</p>
	<p class="bg-white py-2">{checkpoint.description}</p>
</div>
