<script>
	import { fly } from 'svelte/transition';

	export let connected;
	let hover = false;
</script>

<span
	class="p-2 fixed bottom-2 left-4 rounded-lg"
	on:mouseenter={() => (hover = true)}
	on:mouseleave={() => (hover = false)}
>
	<span
		class="inline-block w-2 h-2 rounded-full"
		class:bg-sky-400={connected}
		class:border-2={!connected}
		class:border-amber-400={!connected}
	/>
	{#if hover}
		<p
			class="inline-block text-sm text-slate-600 leading-4 relative top-px px-1"
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
