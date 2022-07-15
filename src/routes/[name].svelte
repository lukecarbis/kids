<script>
	import Nav from '$lib/nav/nav.svelte';
	import Job from '$lib/job/job.svelte';
	export let name;
	export let jobs;

	const getActiveJobIndex = (jobs) => {
		for (const [index, job] of jobs.entries()) {
			if (!job.skipped && !job.done) {
				return index;
			}
		}
		return -1;
	};

	const jobsRemaining = (jobs) => {
		let remaining = 0;
		for (const job of jobs) {
			if (!job.done) {
				remaining++;
			}
		}
		return remaining;
	};

	const skip = () => {
		jobs[activeJobIndex].skipped = true;
	};

	const done = () => {
		const updatedJobs = [...jobs];

		updatedJobs[activeJobIndex].done = true;

		if (-1 === getActiveJobIndex(updatedJobs)) {
			for (let index = 0; index < updatedJobs.length; index++) {
				updatedJobs[index].skipped = false;
			}
		}

		if (!jobsRemaining(updatedJobs)) {
			const container = document.querySelector('#wrap');
			container.scrollTo({
				left: 0,
				top: container.scrollHeight,
				behavior: 'smooth'
			});
		}

		jobs = updatedJobs;
	};

	const select = (event) => {
		const updatedJobs = [...jobs];
		for (let index = event.detail.index; index < activeJobIndex; index++) {
			updatedJobs[index].skipped = false;
		}
		jobs = updatedJobs;
	};

	const revert = (event) => {
		const index = event.detail.index;
		jobs[index].done = false;
	};

	const nickname = name[0].toUpperCase() + name.substring(1);
	$: activeJobIndex = getActiveJobIndex(jobs);
	$: remaining = jobsRemaining(jobs);
</script>

<Nav name={nickname} streak="31" />

<main class="max-w-screen-sm mx-auto p-6 relative">
	{#each jobs as job, index}
		{#if index === activeJobIndex}
			<div class="text-center text-sky-500 font-bold z-0 snap-always snap-start scroll-mt-6">
				<p class="bg-white py-2">Up next:</p>
			</div>
			<span class="border-l-2 w-0 h-6 block m-auto text-center snap-normal" />
		{/if}

		<Job
			{job}
			{index}
			active={index === activeJobIndex}
			{remaining}
			on:skip={skip}
			on:done={done}
			on:select={select}
			on:revert={revert}
		/>

		{#if index !== jobs.length - 1 || !remaining}
			<span
				class="border-l-2 w-0 h-6 block m-auto text-center normal"
				class:border-slate-200={!job.done}
				class:border-emerald-400={job.done && index + 1 < jobs.length && jobs[index + 1].done}
			/>
		{/if}
	{/each}

	{#if !remaining}
		<div class="text-center text-emerald-500 font-bold z-0 snap-normal">
			<p class="bg-white pt-3 text-lg">That's all for now!</p>
			<p class="bg-white py-2">Check back later for more.</p>
		</div>
	{/if}
</main>
