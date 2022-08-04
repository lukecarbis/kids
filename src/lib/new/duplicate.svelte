<script>
	import Name from '$lib/new/name.svelte';
	import Next from '$lib/new/next.svelte';
	import Disclaimer from '$lib/new/disclaimer.svelte';
	import { auth, apiUrl } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import slugify from 'slugify';

	let name = '';
	let slug = '';
	let loading = false;
	$: slug = slugify(name, { lower: true, strict: true });

	export let checkpoints;

	const setDefaults = async () => {
		loading = true;

		const idToken = await auth.currentUser.getIdToken();
		const uid = auth.currentUser.uid;

		await fetch(`${apiUrl}/${uid}.json?auth=${idToken}`, {
			method: 'POST',
			body: JSON.stringify({ name, slug, checkpoints })
		});

		loading = false;
		await goto(`/edit/${slug}`);
	};
</script>

<Name bind:name />
<Next on:next={setDefaults} {name} {loading} />
<Disclaimer />
