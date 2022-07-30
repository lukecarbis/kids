<script>
	export let checkpoint;
	export let AM = true;
</script>

<div class="flex flex-grow flex-wrap items-start content-start gap-2 border-2 rounded-lg p-4">
	<input
		type="text"
		class="text-sky-500 flex-grow w-full h-10 block text-center border-2 bg-slate-50 rounded-lg font-bold text-xl px-2 py-1 focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
		bind:value={checkpoint.title}
		on:focus={(event) => setTimeout(() => event.target.select(), 10)}
	/>
	<input
		class="block flex-grow w-full h-10 text-center border-2 bg-slate-50 rounded-lg px-2 py-1 focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
		bind:value={checkpoint.description}
		on:focus={(event) => setTimeout(() => event.target.select(), 10)}
	/>
	{#if checkpoint.fromIndex > 0}
		<div class="text-center w-full my-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 stroke-slate-500 mr-1 -ml-8 inline-block"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
				/>
			</svg>
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
	{/if}
</div>
