<script context="module">
	const getActiveJobIndex = (jobs) => {
		for (const [index, job] of jobs.entries()) {
			if (!job.skipped && !job.done) {
				return index;
			}
		}
	};
</script>

<script>
	import Nav from '$lib/nav/nav.svelte';
	import Job from '$lib/job/job.svelte';
	export let name;
	export let jobs;
	const nickname = name[0].toUpperCase() + name.substring(1);
	const activeJobIndex = getActiveJobIndex(jobs);
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

		<Job {job} active={index === activeJobIndex} />

		<span
			class="border-l-2 w-0 h-6 block m-auto text-center normal"
			class:border-slate-200={!job.done}
			class:border-emerald-400={job.done && index + 1 < jobs.length && jobs[index + 1].done}
		/>
	{/each}

	<div class="text-center text-emerald-500 font-bold z-0 snap-always snap-start scroll-mt-6">
		<p class="bg-white pt-3 text-lg">That's all for now!</p>
		<p class="bg-white py-2">Check back later for more.</p>
	</div>
</main>
