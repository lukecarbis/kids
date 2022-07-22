<script>
	import Login from '$lib/auth/login.svelte';
	import { auth } from '$lib/firebase';

	let user = auth.currentUser;

	auth.onAuthStateChanged(() => {
		user = auth.currentUser;
	});
</script>

{#if user}
	Welcome, {user.email}
{:else}
	<Login />
{/if}
