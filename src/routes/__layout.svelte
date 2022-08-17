<script>
	import '../app.css';
	import { auth, db } from '$lib/firebase';
	import { ref, onValue } from 'firebase/database';
	import { lists } from '$lib/stores/lists';
	import { meta } from '$lib/stores/meta';
	import Nav from '$lib/nav/nav-main.svelte';
	import Loading from '$lib/welcome/loading.svelte';
	import Error from '$lib/welcome/error.svelte';
	import { page } from '$app/stores';
	import data from '@emoji-mart/data/sets/14/twitter.json';
	import * as pkg from 'emoji-mart';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';

	// Init emojis.
	const { init } = pkg;
	init({ data });

	// Handle auth.
	let loading = true;
	let loaded = false;
	let error = false;

	let unsubscribe = () => {};

	auth.onIdTokenChanged(async (user) => {
		if ($page.routeId === '[user]/[slug]') {
			return;
		}

		// Sign in or refresh ID Token.
		if (user) {
			if (!loaded) {
				loading = true;
			}

			unsubscribe();
			unsubscribe = onValue(ref(db, user.uid), (snapshot) => {
				const data = snapshot.val();
				console.log('onValue', data);

				if (!data.lists || !data.slug) {
					console.error('Not allowed.');
					return;
				}

				meta.set({ slug: data.slug });
				lists.set(data.lists);

				loading = false;
				loaded = true;
			});
		}

		// Not signed in.
		if (!user && !loaded) {
			lists.set({});
			meta.set({});
			unsubscribe();

			if (browser && $page.routeId === '') {
				await goto('/sign-in');
			} else {
				error = true;
			}
		}
	});
</script>

<div class="absolute h-full w-full">
	{#if !loading || $page.routeId === 'sign-in' || $page.routeId === 'sign-up' || $page.routeId === '[user]/[slug]'}
		<slot />
	{:else if error}
		<Nav />
		<Error code={404} />
	{:else}
		<Loading />
	{/if}
</div>
