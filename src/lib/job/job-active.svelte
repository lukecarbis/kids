<script>
	import { emojiCode } from '$lib/helpers/emoji-code.js';
	import Buttons from '$lib/job/buttons/buttons.svelte';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	export let job;

	const scrollToActiveJob = () => {
		setTimeout(() => {
			const container = document.querySelector('#wrap');
			const active = document.querySelector('.up-next');
			container.scrollTo({
				left: 0,
				top: active.offsetTop,
				behavior: 'smooth'
			});
		}, 800);
	};

	// onMount(async () => scrollToActiveJob());
</script>

<div
	class="active p-4 border-2 flex flex-wrap bg-sky-100 border-sky-300 rounded-t-lg"
	transition:slide
>
	<span class="text-center w-full h-10 max-h-full text-4xl">
		<img class="max-h-full" src="/openmoji/{emojiCode(job.emoji)}.svg" alt={job.emoji} />
	</span>
	<h3 class="flex-auto text-center pt-2 text-2xl leading-10">
		{job.title}
	</h3>
	<p class="w-full py-2 text-center">{job.description}</p>
</div>

<Buttons />
