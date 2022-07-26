<script context="module">
	import { auth } from '$lib/firebase';
	import { signOut } from 'firebase/auth';

	export async function load({ fetch }) {
		await signOut(auth);
		await fetch('/api/auth', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		});

		return {};
	}
</script>

<script>
	import { browser } from '$app/env';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';

	if (browser) {
		session.set({ loggedIn: false });
		goto('/');
	}
</script>
