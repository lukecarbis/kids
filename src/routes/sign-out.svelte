<script context="module">
	import { session } from '$app/stores';
	export async function load({ fetch }) {
		await fetch('/api/auth', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		});

		session.set({
			loggedIn: false
		});

		return {
			status: 302,
			redirect: '/'
		};
	}
</script>
