<script>
	import '../app.css';
	import { auth } from '$lib/firebase';
	import { refreshToken } from '$lib/accounts';
	import { session } from '$app/stores';
	import data from '@emoji-mart/data/sets/14/twitter.json';
	import { init } from 'emoji-mart';

	// Init emojis.
	init({ data });

	auth.onAuthStateChanged((userCredentials) => {
		// Refresh session.
		if (userCredentials && $session.loggedIn && $session.time) {
			refreshToken($session.time);
		}
	});
</script>

<div class="absolute h-full w-full">
	<slot />
</div>
