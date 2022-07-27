<script>
	import { session } from '$app/stores';
	import { auth } from '$lib/firebase';
	import NavMain from '$lib/header/nav-main.svelte';
	import Welcome from '$lib/welcome/welcome.svelte';

	export let queues;

	auth.onAuthStateChanged((userCredentials) => {
		if (userCredentials) {
			session.set({
				loggedIn: true,
				uid: auth.currentUser.uid,
				name: auth.currentUser.displayName,
				email: auth.currentUser.email
			});
		}
	});
</script>

<NavMain />

<div
	id="wrap"
	class="h-calc mt-16 pb-8 font-mono select-none overflow-y-scroll snap-y snap-mandatory"
>
	<main class="max-w-screen-sm mx-auto px-6 my-8 left">
		{#if $session.loggedIn}
			<p class="mb-6">Hi, {$session.name}!</p>
			{#if queues.length}
				{#each queues as queue}
					<a
						href="/{queue}"
						class="select-none block relative mx-auto leading-4 mb-6 border border-b-2 rounded-lg active:border-b px-4 py-2 active:top-px"
					>
						{queue}
					</a>
				{/each}
			{:else}
				<Welcome />
			{/if}
		{:else}
			Marketing copy goes here.
		{/if}
	</main>
</div>
