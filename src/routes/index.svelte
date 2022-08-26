<script>
	import { auth } from '$lib/firebase';
	import { lists } from '$lib/stores/lists';
	import Status from '$lib/auth/status.svelte';
	import Nav from '$lib/nav/nav-main.svelte';
	import Welcome from '$lib/welcome/welcome.svelte';
	import List from '$lib/lists/list.svelte';

	const date = new Date();
	const dayOfWeek = date.toLocaleString('default', { weekday: 'long' });
	const dayOfYear = date.toLocaleString('default', { dateStyle: 'long' });
</script>

<Nav />

<main id="X" class="flex flex-wrap font-mono max-w-screen-sm mx-auto mt-24 pb-8  px-6">
	<p class="mb-2 pr-6 flex-grow leading-8">
		Happy {dayOfWeek},
		<a
			href="/account"
			class="underline underline-offset-2 decoration-2 decoration-sky-500 hover:decoration-4"
			>{auth.currentUser.displayName}</a
		>!
	</p>
	<p class="mb-6 flex-0 leading-8 text-right text-slate-400 text-sm whitespace-nowrap">
		{dayOfYear}
	</p>
	{#if Object.values($lists).length}
		{#each Object.values($lists) as list}
			<List {list} />
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
<div class="fixed bottom-6 left-6">
	<Status />
</div>
