<script>
	import { createEventDispatcher } from 'svelte';
	import { session } from '$app/stores';

	const dispatch = createEventDispatcher();

	const signOut = async () => {
		const result = await fetch('/api/sign-out', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		});

		if (result.ok) {
			session.set({
				loggedIn: false
			});
			dispatch('success');
		}
	};
</script>

<button on:click={signOut} class="text-sky-500">Sign Out</button>
