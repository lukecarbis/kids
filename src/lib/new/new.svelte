<script>
	import { lists } from '$lib/stores/lists';
	import sample from '$lib/sample.json';
	import empty from '$lib/empty.json';
	import Name from '$lib/new/name.svelte';
	import Next from '$lib/new/next.svelte';
	import Sample from '$lib/new/sample.svelte';
	import Disclaimer from '$lib/new/disclaimer.svelte';
	import { newList, newListSlug } from '$lib/db';
	import { goto } from '$app/navigation';

	let name = '';
	let loading = false;
	let data = 'sample';

	const saveNewList = async () => {
		loading = true;

		const list = {};

		list.name = name;
		list.slug = newListSlug();
		list.lastUpdated = false;

		if ('sample' === data) {
			list.checkpoints = sample.checkpoints;
		} else if ('empty' === data) {
			list.checkpoints = empty.checkpoints;
		} else {
			list.checkpoints = $lists[data].checkpoints;
		}

		await newList(list);
		await goto(`/edit/${list.slug}`);
	};
</script>

<Name bind:name />
<Next on:next={saveNewList} {name} {loading} />
<Sample bind:data />

<Disclaimer />
