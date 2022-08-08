<script context="module">
	import { auth } from '$lib/firebase';
	import { signOut } from 'firebase/auth';

	export const load = async () => {
		await signOut(auth);
		return {};
	};
</script>
