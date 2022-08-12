<script>
	import '../app.css';
	import { auth, apiUrl } from '$lib/firebase';
	import { lists, setListsFromDataStore } from '$lib/stores/lists';
	import { meta } from '$lib/stores/meta';
	import Loading from '$lib/welcome/loading.svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import data from '@emoji-mart/data/sets/14/twitter.json';
	import * as pkg from 'emoji-mart';

	// Init emojis.
	const { init } = pkg;
	init({ data });

	// Handle auth.
	let loading = true;

	auth.onIdTokenChanged(async (user) => {
		if ($page.routeId === '[user]/[slug]') {
			return;
		}
		// Sign in or refresh ID Token.
		if (user) {
			loading = true;
			const idToken = await user.getIdToken();
			const uid = user.uid;
			const result = await fetch(`${apiUrl}/${uid}.json?auth=${idToken}`);
			let data = await result.json();

			if (data && data.error) {
				console.error(data.error);
				return;
			}

			if (!data || !data.lists || !data.slug) {
				console.error('Not allowed.');
				return;
			}

			meta.set({ slug: data.slug });
			setListsFromDataStore(data.lists);
			loading = false;
		}

		// Sign out.
		if (!user) {
			lists.set({});
			if (browser) {
				await goto('/sign-in');
			}
		}
	});
</script>

<div class="absolute h-full w-full">
	{#if !loading || $page.routeId === 'sign-in' || $page.routeId === 'sign-up' || $page.routeId === '[user]/[slug]'}
		<slot />
	{:else}
		<Loading />
	{/if}
</div>
