<script context="module">
	import { auth } from '$lib/firebase';
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	export const load = async () => {
		await signOut(auth);
		if (browser) {
			await goto('/sign-in');
		}
		return {};
	};
</script>
