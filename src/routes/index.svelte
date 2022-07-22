<script>
	import Login from '$lib/auth/login.svelte';
	import List from '$lib/list/list.svelte';
	import { auth } from '$lib/firebase';

	let user = auth.currentUser;

	auth.onAuthStateChanged(() => {
		user = auth.currentUser;
	});
</script>

{#if user}
	<List />
{:else}
	<Login />
{/if}
