<script>
	import Nav from '$lib/nav/nav-edit.svelte';
	import New from '$lib/new/new.svelte';
</script>

<Nav title="" back="/" />

<div id="wrap" class="h-calc mt-16 pb-8 font-mono select-none overflow-y-scroll">
	<main class="flex flex-wrap max-w-screen-sm mx-auto px-6 my-8 left">
		<p class="mb-6">
			What would you like to call this list? We suggest using the name of the person who will use
			it.
		</p>
		<New />
	</main>
</div>
