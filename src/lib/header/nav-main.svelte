<script>
	import SignOut from '$lib/auth/sign-out-button.svelte';
	import { session } from '$app/stores';
</script>

<header
	class="px-6 py-5 w-full top-0 z-10 flex items-stretch justify-between border-b-2 border-b-slate-200 bg-white fixed"
>
	<a href="/" class="text-sky-500">Home</a>
	<div>
		{#if $session.loggedIn}
			<SignOut />
		{:else}
			<a href="/sign-up" class="text-amber-500 pl-6">Sign Up</a>
			<a href="/sign-in" class="text-sky-500 pl-6">Sign In</a>
		{/if}
	</div>
</header>
