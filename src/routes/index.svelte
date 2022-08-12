<script>
	import { auth } from '$lib/firebase';
	import { lists } from '$lib/stores/lists';
	import { queue, setQueue, resetCheckpoints } from '$lib/stores/queue';
	import Nav from '$lib/nav/nav-main.svelte';
	import Welcome from '$lib/welcome/welcome.svelte';
	import List from '$lib/lists/list.svelte';

	const queues = [];

	Object.values($lists).forEach((list) => {
		const { name, id, checkpoints, lastUpdated } = list;
		const checkpointsClone = JSON.parse(JSON.stringify(checkpoints));
		setQueue(resetCheckpoints(checkpointsClone, lastUpdated), name, id);
		queues.push($queue);
	});
	const date = new Date();
	const dayOfWeek = date.toLocaleString('default', { weekday: 'long' });
	const dayOfYear = date.toLocaleString('default', { dateStyle: 'long' });
</script>

<Nav />

<div id="wrap" class="mt-24 pb-8 font-mono select-none">
	<main class="flex flex-wrap max-w-screen-sm mx-auto px-6 my-8">
		<p class="mb-2 pr-6 flex-grow leading-8">
			Happy {dayOfWeek}, {auth.currentUser.displayName}!
		</p>
		<p class="mb-6 flex-0 leading-8 text-right text-slate-400 text-sm whitespace-nowrap">
			{dayOfYear}
		</p>
		{#if Object.values($lists).length}
			{#each Object.entries($lists) as [slug, list], index}
				<List name={list.name} slug={list.slug} seen={list.lastUpdated} queue={queues[index]} />
			{/each}
			<a
				href="/new"
				class="py-2 px-6 inline-block text-center font-bold border-2 border-b-4 border-sky-600 bg-sky-400 text-white rounded-lg active:border-b-2 active:mt-px active:mb-px"
			>
				Add New List
			</a>
		{:else}
			<Welcome />
		{/if}
	</main>
</div>
