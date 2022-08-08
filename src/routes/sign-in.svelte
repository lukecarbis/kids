<script>
	import Nav from '$lib/nav/nav-main.svelte';
	import Form from '$lib/auth/form.svelte';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';

	if ($session.signedIn) {
		goto('/');
	}
</script>

<Nav />
<Form action="sign-in" />
