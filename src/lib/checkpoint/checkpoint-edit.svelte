<script>
	export let checkpoint;
	export let AM = true;
</script>

<div class="flex flex-grow flex-wrap items-center gap-2 border-2 rounded-lg p-2">
	<input
		type="text"
		class="text-sky-500 flex-grow w-full block text-center border-2 bg-slate-50 rounded-lg font-bold text-xl px-2 py-1 focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
		bind:value={checkpoint.title}
		on:focus={(event) => setTimeout(() => event.target.select(), 10)}
	/>
	<input
		class="block flex-grow w-full text-center border-2 bg-slate-50 rounded-lg px-2 py-1 focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
		bind:value={checkpoint.description}
		on:focus={(event) => setTimeout(() => event.target.select(), 10)}
	/>
	<div class="text-center w-full my-2">
		<p class="text-sm mb-2">Unlocks at:</p>
		<input
			type="number"
			placeholder="8"
			min="0"
			max="12"
			class="text-center border-2 rounded-lg bg-slate-50 w-16 pl-2 py-1 focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
		/>
		<button
			class="inline-block border border-b-2 relative active:top-px active:border-b rounded-lg px-2 py-1 w-16"
			on:click={() => (AM = !AM)}
		>
			{#if AM}AM{/if}
			{#if !AM}PM{/if}
		</button>
	</div>
</div>
