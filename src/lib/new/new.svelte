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

	export let fromListId = false;

	let name = '';
	let loading = false;
	let useSampleData = !fromListId;

	const newSlug = newListSlug();

	const saveNewList = async () => {
		loading = true;

		const list = useSampleData ? sample : empty;

		list.name = name;
		list.slug = newSlug;
		list.lastUpdated = false;

		if (fromListId) {
			list.checkpoints = $lists[fromListId].checkpoints;
		}

		await newList(list);

		loading = false;
		await goto(`/edit/${newSlug}`);
	};
</script>

<Name bind:name />
<Next on:next={saveNewList} {name} {loading} />
{#if !fromListId}
	<Sample bind:useSampleData />
{/if}
<Disclaimer />
