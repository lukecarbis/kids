<script context="module">
	import { auth } from '$lib/firebase/client';
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';

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
	import { session } from '$app/stores';
	if ($session) {
		session.set({
			loggedIn: false
		});
	}
	goto('/');
</script>
