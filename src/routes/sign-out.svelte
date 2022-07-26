<script context="module">
	import { auth } from '$lib/firebase';
	import { signOut } from 'firebase/auth';

	export async function load({ fetch }) {
		await signOut(auth);
		await fetch('/api/auth', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		});

		return {
			status: 302,
			redirect: '/'
		};
	}
</script>
