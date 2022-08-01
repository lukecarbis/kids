<script>
	import { emojiCode } from '$lib/helpers/emoji-code';
	import Day from '$lib/job/buttons/day.svelte';

	export let job;
	export let days = [1, 1, 1, 1, 1, 0, 0];
</script>

<div
	class="border-2 rounded-lg p-4 text-center transition-colors duration-1000"
	class:bg-amber-100={job.updated}
	class:border-amber-300={job.updated}
	class:transition-none={job.updated}
>
	<div class="flex flex-grow flex-wrap gap-3">
		<input
			class="w-full h-10 text-center border-2 bg-slate-50 rounded-lg px-2 py-1 focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
			bind:value={job.title}
			on:focus={(event) => setTimeout(() => event.target.select(), 10)}
		/>
		<div class="flex flex-grow flex-wrap h-10">
			<button
				class="flex-grow bg-white w-6 h-10 border border-b-2 active:mt-px active:border-b rounded-lg py-1 px-1 mr-3 text-center transition-all"
			>
				<img
					class="h-full max-h-6 inline"
					src="/openmoji/{emojiCode(job.emoji)}.svg"
					alt={job.emoji}
				/>
			</button>
			<Day letter="M" bind:enabled={days[0]} first={true} />
			<Day letter="T" bind:enabled={days[1]} />
			<Day letter="W" bind:enabled={days[2]} />
			<Day letter="T" bind:enabled={days[3]} />
			<Day letter="F" bind:enabled={days[4]} />
			<Day letter="S" bind:enabled={days[5]} />
			<Day letter="S" bind:enabled={days[6]} last={true} />
		</div>
	</div>
</div>
