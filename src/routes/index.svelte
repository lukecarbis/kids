<script>
	import { session } from '$app/stores';
	import { auth } from '$lib/firebase';
	import NavMain from '$lib/header/nav-main.svelte';
	import Welcome from '$lib/welcome/welcome.svelte';
	import Name from '$lib/names/name.svelte';

	export let names;

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
			{#if names.length}
				{#each names as name}
					<Name {name} />
				{/each}
			{:else}
				<Welcome />
			{/if}
		{:else}
			Marketing copy goes here.
		{/if}
	</main>
</div>
