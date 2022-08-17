<script>
	import { lists, getListId } from '$lib/stores/lists';
	import Nav from '$lib/nav/nav-edit.svelte';
	import New from '$lib/new/new.svelte';

	export let slug;
	const listId = getListId(slug);
</script>

<Nav title="" back="/" />

<div id="wrap" class="h-calc mt-16 pb-8 font-mono select-none overflow-y-scroll">
	<main class="flex flex-wrap max-w-screen-sm mx-auto px-6 my-8 left">
		<p class="mb-6">
			This will copy the <strong>{$lists[listId].name}</strong> list into a new one. What should it be
			called?
		</p>
		<New fromListId={listId} />
	</main>
</div>
