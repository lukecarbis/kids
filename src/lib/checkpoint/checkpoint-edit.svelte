<script>
	export let title;
	export let description;
	export let updated = false;
	export let index = 0;
	export let fullHour;

	$: hour = fullHour;
	$: AM = true;

	$: if (hour > 12) {
		hour = hour - 12;
		AM = false;
	}

	const setHour = () => {
		if (null === hour) {
			fullHour = hour;
			return;
		}
		if (hour === 0 && AM) {
			fullHour = hour;
			return;
		}
		if (hour === 12 && AM) {
			hour = 0;
			fullHour = hour;
			return;
		}
		if (hour === 0 && !AM) {
			hour = 12;
			fullHour = hour;
			return;
		}
		if (AM) {
			fullHour = hour;
			return;
		}
		fullHour = hour + 12;
	};
</script>

<div
	class="flex flex-grow flex-wrap items-start content-start gap-2 border-2 rounded-lg p-4 transition-colors duration-1000"
	class:bg-amber-100={updated}
	class:transition-none={updated}
>
	<input
		type="text"
		class="text-sky-500 flex-grow w-full h-10 block text-center border-2 bg-slate-50 rounded-lg font-bold text-xl px-2 py-1 focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
		bind:value={title}
		on:focus={(event) => setTimeout(() => event.target.select(), 10)}
	/>
	<input
		class="block flex-grow w-full h-10 text-center text-sm border-2 bg-slate-50 rounded-lg px-2 py-1 focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
		bind:value={description}
		on:focus={(event) => setTimeout(() => event.target.select(), 10)}
	/>
	{#if index > 0}
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
				bind:value={hour}
				on:change={setHour}
				class="text-center border-2 rounded-lg bg-slate-50 w-16 pl-2 py-1 focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
			/>
			<button
				class="inline-block border border-b-2 bg-white active:top-px active:border-b rounded-lg px-2 py-1 w-16"
				on:click={() => {
					AM = !AM;
					setHour();
				}}
			>
				{#if AM}AM{/if}
				{#if !AM}PM{/if}
			</button>
		</div>
	{/if}
</div>
