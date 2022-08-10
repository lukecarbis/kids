<script>
	import { auth } from '$lib/firebase';
	import { lists } from '$lib/stores/lists';
	import Nav from '$lib/nav/nav-main.svelte';
	import Welcome from '$lib/welcome/welcome.svelte';
	import Edit from '$lib/lists/edit.svelte';
	import Name from '$lib/lists/name.svelte';
</script>

<Nav />

<div
	id="wrap"
	class="h-calc mt-16 pb-8 font-mono select-none overflow-y-scroll snap-y snap-mandatory"
>
	<main class="flex flex-wrap max-w-screen-sm mx-auto px-6 my-8 left">
		<p class="mb-4 flex-grow leading-8 py-1">Hi, {auth.currentUser.displayName}!</p>
		{#if Object.values($lists).length}
			<Edit />
			{#each Object.values($lists) as list}
				<Name name={list.name} slug={list.slug} />
			{/each}
		{:else}
			<Welcome />
		{/if}
	</main>
</div>
