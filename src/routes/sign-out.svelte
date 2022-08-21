<script context="module">
	import { lists } from '$lib/stores/lists';
	import { meta } from '$lib/stores/meta';
	import { auth } from '$lib/firebase';
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	export const load = async () => {
		await signOut(auth);
		if (browser) {
			await goto('/sign-in');
		}
		lists.set({});
		meta.set({});
		return {};
	};
</script>
