<script>
	import { fly } from 'svelte/transition';

	export let connected;
	let hover = false;
</script>

<span
	class="absolute w-2 h-2 rounded-full bottom-4 left-4"
	class:bg-sky-400={connected}
	class:border-2={!connected}
	class:border-amber-400={!connected}
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
/>
{#if hover}
	<p
		class="text-sm absolute bottom-2.5 left-8 text-slate-600"
		transition:fly={{ x: -10, duration: 100 }}
	>
		{#if connected}
			Connected
		{:else}
			Disconnected
		{/if}
	</p>
{/if}
