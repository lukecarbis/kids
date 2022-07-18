<script>
	import Connector from '$lib/job/connector.svelte';
	export let checkpoint

	let hour = checkpoint.hour + ' AM';

	if ( checkpoint.hour === 12 ) {
		hour = checkpoint.hour + ' PM';
	} else if ( checkpoint.hour - 12 > 0 ) {
		hour = checkpoint.hour - 12 + ' PM';
	}
</script>

<div
	class="checkpoint my-4 text-center z-0 snap-always snap-start scroll-mt-6"
>
	<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-slate-300 block mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
		<path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
	</svg>
	<p class="bg-white text-amber-500 text-l py-2">Unlocks at {hour}</p>
	<p class="bg-white text-slate-300 text-l py-2">{checkpoint.title}</p>
</div>

<Connector />
