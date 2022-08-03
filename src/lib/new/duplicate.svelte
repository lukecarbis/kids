<script>
	import Name from '$lib/new/name.svelte';
	import Next from '$lib/new/next.svelte';
	import Disclaimer from '$lib/new/disclaimer.svelte';
	import { auth, apiUrl } from '$lib/firebase';
	import { goto } from '$app/navigation';

	let name = '';
	let loading = false;
	export let checkpoints;
	export let tasks;

	const setDefaults = async () => {
		loading = true;

		const idToken = await auth.currentUser.getIdToken();
		const uid = auth.currentUser.uid;

		await fetch(`${apiUrl}/${uid}.json?auth=${idToken}`, {
			method: 'PATCH',
			body: JSON.stringify({
				[name]: { checkpoints, tasks }
			})
		});

		loading = false;
		await goto(`/edit/${name}`);
	};
</script>

<Name bind:name />
<Next on:next={setDefaults} {name} {loading} />
<Disclaimer />
