<script context="module">
	import { auth } from '$lib/firebase';
	export async function load({ session }) {
		const user = auth.currentUser;
		if (user) {
			return {
				status: 302,
				redirect: '/'
			};
		}

		return {};
	}
</script>

<script>
	import Nav from '$lib/header/nav-main.svelte';
	import SignIn from '$lib/auth/signin.svelte';
	import { goto } from '$app/navigation';

	auth.onAuthStateChanged(() => {
		const user = auth.currentUser;
		if (user) {
			goto('/');
		}
	});
</script>

<Nav />
<SignIn />
