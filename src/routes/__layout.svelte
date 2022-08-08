<script>
	import '../app.css';
	import { auth } from '$lib/firebase';
	import { setUserCookie, deleteUserCookie } from '$lib/auth';
	import { session } from '$app/stores';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import data from '@emoji-mart/data/sets/14/twitter.json';
	import * as pkg from 'emoji-mart';

	const { init } = pkg;

	// Init emojis.
	init({ data });

	// Handle auth.
	auth.onIdTokenChanged((user) => {
		// Sign in or refresh ID Token.
		if (user) {
			setUserCookie();
		}

		// Sign out.
		if (!user && $session.signedIn) {
			if (browser) {
				deleteUserCookie();
				goto('/');
			}
		}
	});
</script>

<div class="absolute h-full w-full">
	<slot />
</div>
