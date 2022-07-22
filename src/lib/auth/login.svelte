<script>
	import { createUser, signUserIn } from '$lib/firebase';

	let username = '';
	let password = '';
	let result = Promise.resolve();

	const signIn = async () => {
		result = signUserIn(username, password);
	};

	const signUp = async () => {
		result = createUser(username, password);
	};
</script>

<section class="font-mono max-w-screen-sm flex items-center justify-center h-screen mx-auto px-6">
	<form on:submit|preventDefault={signIn} class="w-64">
		<h2 class="mb-6 text-center font-bold">Sign In</h2>
		<input
			bind:value={username}
			type="text"
			class="w-full border-2 bg-slate-50 rounded-lg block mx-auto mb-2 px-2 h-12 focus:outline-none focus:ring focus:ring-sky-400"
			placeholder="Username"
		/>
		<input
			bind:value={password}
			type="password"
			class="w-full border-2 bg-slate-50 rounded-lg block mx-auto mb-6 px-2 h-12 focus:outline-none focus:ring focus:ring-sky-400"
			placeholder="Password"
		/>
		{#await result then user}
			{#if user}
				<p class="text-emerald-500 text-sm mb-6 text-center">Welcome!</p>
			{/if}
		{:catch error}
			{#if error.code === 'auth/invalid-email'}
				<p class="text-rose-500 text-sm mb-6 text-center">Invalid email.</p>
			{:else if error.code === 'auth/user-disabled'}
				<p class="text-rose-500 text-sm mb-6 text-center">This account is disable.</p>
			{:else if error.code === 'auth/email-already-in-use'}
				<p class="text-rose-500 text-sm mb-6 text-center">Email already in use.</p>
			{:else if error.code === 'auth/weak-password'}
				<p class="text-rose-500 text-sm mb-6 text-center">Your password sucks.</p>
			{:else if error.code === 'auth/too-many-requests'}
				<p class="text-rose-500 text-sm mb-6 text-center">Too many attempts. Try later.</p>
			{:else if error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'}
				<p class="text-rose-500 text-sm mb-6 text-center">Wrong password. Try again?</p>
			{:else}
				<p class="text-rose-500 text-sm mb-6 text-center">Unable to sign in.</p>
			{/if}
		{/await}
		<button
			type="submit"
			on:click|preventDefault={signIn}
			class="select-none w-full h-10 leading-4 mb-6 border-b-2 bg-sky-500 text-white border-sky-600 rounded-lg active:border-b px-4 py-2 active:mt-px"
			class:pointer-events-none={username === '' || password === ''}
		>
			{#await result}
				<svg
					class="animate-spin mx-auto h-5 w-5 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
			{:then user}
				Sign In
			{:catch error}
				Sign In
			{/await}
		</button>

		<div class="relative">
			<hr class="border-b-2 border-t-0 mb-10 py-2" />

			<span
				class="absolute w-12 uppercase -ml-6 top-0 top-2 left-1/2 text-center bg-white text-sm text-slate-800"
			>
				Or
			</span>
		</div>

		<button
			on:click|preventDefault={signUp}
			class:pointer-events-none={username === '' || password === ''}
			class="select-none w-full h-10 leading-4 mb-6 border border-b-2 rounded-lg active:border-b px-4 py-2 active:mt-px"
		>
			Sign Up
		</button>
	</form>
</section>
