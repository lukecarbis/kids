<script>
	import { fly } from 'svelte/transition';

	export let connected;
	let hover = false;
</script>

<span
	class="flex items-center h-8 px-3 rounded-lg z-50 bg-white border"
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
>
	<span
		class="inline-block w-2 h-2 rounded-full"
		class:bg-sky-400={connected}
		class:border-2={!connected}
		class:border-amber-400={!connected}
	/>
	{#if hover || !connected}
		<p
			class="text-sm leading-4 text-slate-600 -mt-px relative top-px pl-2"
			transition:fly={{ x: -10, duration: 100 }}
		>
			{#if connected}
				Connected
			{:else}
				Disconnected
			{/if}
		</p>
	{/if}
</span>
