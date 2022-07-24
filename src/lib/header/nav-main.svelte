<script>
	import { auth, signUserOut } from '$lib/firebase';

	let user = auth.currentUser;

	auth.onAuthStateChanged(() => {
		user = auth.currentUser;
	});
</script>

<header
	class="px-6 py-5 w-full top-0 z-10 flex items-stretch justify-between border-b-2 border-b-slate-200 bg-white fixed"
>
	<a href="/" class="text-sky-500">Home</a>
	<div>
		{#if user}
			<button on:click={signUserOut} class="text-sky-500">Sign Out</button>
		{:else}
			<a href="/signup" class="text-amber-500 pl-6">Sign Up</a>
			<a href="/signin" class="text-sky-500 pl-6">Sign In</a>
		{/if}
	</div>
</header>
