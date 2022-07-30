<script>
	import { emojiCode } from '$lib/helpers/emoji-code';
	import Day from '$lib/job/buttons/day.svelte';

	export let job;
	export let index;
	const days = [1, 1, 1, 1, 1, 0, 0];
</script>

<div class="border-2 rounded-lg p-4 text-center">
	<div class="flex flex-grow flex-wrap gap-3">
		<input
			class="w-full h-10 text-center border-2 bg-slate-50 rounded-lg px-2 py-1 focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
			bind:value={job.title}
			on:focus={(event) => setTimeout(() => event.target.select(), 10)}
		/>
		<div class="flex flex-grow flex-wrap gap-2">
			<button class="flex-1 border border-b-2 active:mt-px active:border-b rounded-lg px-2 py-1">
				<img src="/openmoji/{emojiCode(job.emoji)}.svg" alt={job.emoji} />
			</button>
			<Day letter="M" bind:enabled={days[0]} />
			<Day letter="T" bind:enabled={days[1]} />
			<Day letter="W" bind:enabled={days[2]} />
			<Day letter="T" bind:enabled={days[3]} />
			<Day letter="F" bind:enabled={days[4]} />
			<Day letter="S" bind:enabled={days[5]} />
			<Day letter="S" bind:enabled={days[6]} />
		</div>
	</div>
</div>
