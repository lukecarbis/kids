<script>
	import { slide } from 'svelte/transition';

	export let first;
	export let checkpoint;

	const getHourString = (hour) => {
		let hourString = hour + ' AM';

		if (hour === 12) {
			hourString = hour + ' PM';
		} else if (hour - 12 > 0) {
			hourString = hour - 12 + ' PM';
		}

		return hourString;
	};
</script>

<div class="checkpoint locked mt-6 mb-2 text-center z-0" transition:slide>
	{#if first}
		<p class="bg-white leading-8 text-emerald-500 font-bold">That's all for now!</p>
		<p class="bg-white pb-4 leading-8 text-slate-500">
			Check back at <span class="font-bold">{getHourString(checkpoint.hour)}</span> for more!
		</p>
	{/if}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6 stroke-slate-300 block mx-auto"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
		/>
	</svg>
	<p class="bg-white text-slate-300 py-2">{checkpoint.title}</p>
</div>
