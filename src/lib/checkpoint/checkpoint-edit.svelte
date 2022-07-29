<script>
	import Connector from '$lib/job/connector.svelte';
	import Move from '$lib/job/buttons/move.svelte';
	export let checkpoint;
</script>

<div class="checkpoint flex">
	<div
		class="flex flex-wrap flex-grow justify-center gap-2 border-2 rounded-lg p-2 mr-4 text-center"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 mt-2 stroke-rose-400"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
			/>
		</svg>
		<h3 class="flex-grow w-full font-bold">Checkpoint</h3>
		<input
			type="text"
			class="text-sky-500 flex-grow w-full block text-center border bg-slate-50 rounded-lg font-bold text-xl px-2 py-1 focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
			bind:value={checkpoint.title}
		/>
		<input
			class="block flex-grow  w-full text-center border bg-slate-50 rounded-lg px-2 py-1 focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
			bind:value={checkpoint.description}
		/>
	</div>
	<div class="flex flex-wrap gap-2 items-center content-start">
		<Move {checkpoint} direction="up" />
		<Move {checkpoint} direction="down" />
	</div>
</div>

<Connector />
