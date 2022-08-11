<script>
	import { lists } from '$lib/stores/lists';
	import Nav from '$lib/nav/nav-edit.svelte';
	import Duplicate from '$lib/new/duplicate.svelte';

	export let slug;
	let { name, checkpoints } = $lists[slug];
</script>

<Nav title="" back="/" />

<div
	id="wrap"
	class="h-calc mt-16 pb-8 font-mono select-none overflow-y-scroll snap-y snap-mandatory"
>
	<main class="flex flex-wrap max-w-screen-sm mx-auto px-6 my-8 left">
		<p class="mb-6">
			This will copy the <strong>{name}</strong> list into a new one. What should it be called?
		</p>
		<Duplicate {checkpoints} />
	</main>
</div>
