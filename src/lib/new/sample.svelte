<script>
	import Radio from '$lib/new/radio.svelte';
	import { lists } from '$lib/stores/lists';

	export let data;
	const listsEntries = Object.entries(JSON.parse(JSON.stringify($lists)));
</script>

<div class="mb-4 w-full leading-10 px-4 py-2 border-2 rounded-lg">
	<Radio name="sample" bind:value={data} label="Start with a sample list" />
	<Radio name="empty" bind:value={data} label="Start with an empty list" />
	{#each listsEntries as [listId, list]}
		<Radio name={listId} bind:value={data} label="Start with a copy of {list.name}" />
	{/each}
</div>
