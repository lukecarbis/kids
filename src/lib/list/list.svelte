<script>
	import Logout from '$lib/auth/log.svelte';
</script>

<main class="font-mono max-w-screen-sm mx-auto px-6 my-20 text-center">
	<a
		href="/lior"
		class="select-none block mx-auto leading-4 mb-6 border border-b-2 rounded-lg active:border-b px-4 py-2 active:mt-px"
	>
		Lior
	</a>
	<Logout />
</main>
