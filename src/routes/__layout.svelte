<script>
	import '../app.css';
	import { auth, db } from '$lib/firebase';
	import { onValue, ref } from 'firebase/database';
	import { lists } from '$lib/stores/lists';
	import { meta } from '$lib/stores/meta';
	import Nav from '$lib/nav/nav-main.svelte';
	import Loading from '$lib/welcome/loading.svelte';
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

	let unsubscribe = () => {};

	auth.onIdTokenChanged((user) => {
		if ($page.routeId === '[user]/[slug]') {
			return;
		}

		// Sign in or refresh ID Token.
		if (user) {
			if (!loaded || !Object.values($lists).length) {
				loading = true;
			}

			user.getIdToken().then(() => {
				unsubscribe();
				unsubscribe = onValue(ref(db, user.uid), setStoresWithDBSnapshot);
			});
		}

		// Not signed in.
		if (!user && !loaded) {
			unsubscribe();
			if (browser && $page.routeId === '') {
				goto('/sign-in');
			}
		}
	});

	const setStoresWithDBSnapshot = (snapshot) => {
		const data = snapshot.val();

		if (!data.lists) {
			data.lists = {};
		}

		meta.set({ slug: data.slug });
		lists.reset(data.lists);

		loading = false;
		loaded = true;
	};
</script>

{#if !loading || $page.routeId === 'sign-in' || $page.routeId === 'sign-up' || $page.routeId === '[user]/[slug]'}
	<slot />
{:else}
	<Nav />
	<Loading />
{/if}
