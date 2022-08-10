<script>
	import { auth } from '$lib/firebase';
</script>

<header
	class="px-6 py-5 w-full top-0 z-10 font-mono flex items-stretch justify-between border-b-2 border-b-slate-200 bg-white fixed"
>
	<a href="/" rel="external" class="text-sky-500">Logo</a>
	<div>
		{#if auth.currentUser}
			<a href="/sign-out" class="text-sky-500 pl-6">Sign Out</a>
		{:else}
			<a href="/sign-up" class="text-amber-500 pl-6">Sign Up</a>
			<a href="/sign-in" class="text-sky-500 pl-6">Sign In</a>
		{/if}
	</div>
</header>
