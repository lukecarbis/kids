<script>
	import Nav from '$lib/header/nav-main.svelte';
	import Form from '$lib/auth/form.svelte';
	import { session } from '$app/stores';
	import { goto } from '$app/navigation';

	if ($session.loggedIn) {
		goto('/');
	}
</script>

<Nav />
<Form signUp={true} />
