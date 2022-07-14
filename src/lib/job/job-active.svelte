<script context="module">
	const scrollToActiveJob = () => {
		const container = document.querySelector('#wrap');
		const active = document.querySelector('.active-job');
		container.scrollTo({
			left: 0,
			top: active.offsetTop,
			behavior: 'smooth'
		});
	};
</script>

<script>
	import Buttons from '$lib/job/buttons.svelte';
	import { onMount } from 'svelte';
	export let job;

	onMount(async () => scrollToActiveJob());
</script>

<div class="active-job p-4 border-2 flex flex-wrap bg-sky-100 border-sky-300 rounded-t-lg">
	<span class="mr-4 text-center w-full h-10 text-4xl">
		{job.emoji}
	</span>
	<h2 class="flex-auto text-center pt-2 text-2xl leading-10">
		{job.title}
	</h2>
	<p class="w-full py-2 text-center">{job.description}</p>
</div>

<Buttons />
