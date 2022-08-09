<script>
	import '../app.css';
	import { auth } from '$lib/firebase';
	import { setUserCookie, deleteUserCookie } from '$lib/auth';
	import { session, page } from '$app/stores';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import data from '@emoji-mart/data/sets/14/twitter.json';
	import * as pkg from 'emoji-mart';

	const { init } = pkg;

	// Init emojis.
	init({ data });

	// Handle auth.
	auth.onIdTokenChanged((user) => {
		console.info(user);
		// Sign in or refresh ID Token.
		if (user) {
			setUserCookie(!$session.signedIn);
		}

		// Sign out.
		if (!user) {
			if ($session.signedIn) {
				deleteUserCookie();
			}
			if (browser) {
				goto('/sign-in');
			}
		}
	});
</script>

<div class="absolute h-full w-full">
	{#if $session.signedIn || $page.routeId === 'sign-in' || $page.routeId === 'sign-up'}
		<slot />
	{:else}
		<div class="flex justify-center items-center w-screen h-screen">
			<div
				class="flex flex-wrap justify-center items-center w-48 h-auto p-4 border-2 rounded-lg text-slate-600"
			>
				<span class="flex-grow w-full text-center pb-4">Loading…</span>
				<svg
					class="animate-spin mx-auto h-5 w-5 text-slate-400"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
			</div>
		</div>
	{/if}
</div>
