<script>
	import { saveNewList } from '$lib/stores/lists';
	import sample from '$lib/sample.json';
	import empty from '$lib/empty.json';
	import Name from '$lib/new/name.svelte';
	import Next from '$lib/new/next.svelte';
	import Sample from '$lib/new/sample.svelte';
	import Disclaimer from '$lib/new/disclaimer.svelte';
	import { auth, apiUrl } from '$lib/firebase';
	import { goto } from '$app/navigation';
	import slugify from 'slugify';

	let name = '';
	let loading = false;
	let useSampleData = true;
	$: slug = slugify(name, { lower: true, strict: true });

	const setDefaults = async () => {
		loading = true;

		const idToken = await auth.currentUser.getIdToken();
		const uid = auth.currentUser.uid;
		const data = useSampleData ? sample : empty;

		data.name = name;
		data.slug = slug;

		const response = await fetch(`${apiUrl}/${uid}.json?auth=${idToken}`, {
			method: 'POST',
			body: JSON.stringify(data)
		});

		const result = await response.json();
		data.id = result.name;

		saveNewList(slug, data);

		loading = false;
		await goto(`/edit/${slug}`);
	};
</script>

<Name bind:name />
<Next on:next={setDefaults} {name} {loading} />
<Sample bind:useSampleData />
<Disclaimer />
