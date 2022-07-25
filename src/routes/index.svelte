<script>
	import List from '$lib/list/list.svelte';
	import Nav from '$lib/header/nav-main.svelte';
	import { session } from '$app/stores';
</script>

<Nav />

<div
	id="wrap"
	class="h-calc mt-16 pb-8 font-mono select-none overflow-y-scroll snap-y snap-mandatory"
>
	<main class="max-w-screen-sm mx-auto px-6 my-16 text-center">
		{#if $session.loggedIn && $session.name}
			<p class="text-left mb-6">Hi, {$session.name}!</p>
			<List />
		{:else}
			Marketing copy goes here.
		{/if}
	</main>
</div>
