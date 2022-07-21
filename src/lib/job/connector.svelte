<script>
	import { slide } from 'svelte/transition';
	export let done = false;
</script>

<span
	class="border-l-2 w-0 h-6 block m-auto text-center normal"
	class:border-emerald-400={done}
	transition:slide
/>
