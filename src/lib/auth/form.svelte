<script>
	import { goto } from '$app/navigation';
	import { signUp, signIn } from '$lib/accounts';
	import Error from '$lib/auth/error.svelte';

	let name = '';
	let email = '';
	let password = '';
	let loading = false;
	let errorCode = '';

	export let action = 'sign-in';

	const title = {
		'sign-in': 'Sign In',
		'sign-up': 'Sign Up'
	}[action];

	const submit = async () => {
		loading = true;

		try {
			if ('sign-in' === action) {
				await signIn(email, password);
			}
			if ('sign-up' === action) {
				await signUp(name, email, password);
			}
			goto('/');
		} catch (error) {
			errorCode = error.code;
			loading = false;
		}
	};
</script>

<section
	class="font-mono max-w-screen-sm flex items-top justify-center h-screen mx-auto px-6 mt-10 pt-12"
>
	<form on:submit|preventDefault={submit} class="w-64">
		<h2 class="mb-6 text-center font-bold">{title}</h2>
		{#if 'sign-up' === action}
			<input
				bind:value={name}
				type="text"
				class="w-full border-2 bg-slate-50 rounded-lg block mx-auto mb-2 px-2 h-12 focus:outline-none focus:ring focus:ring-sky-400"
				placeholder="First name"
			/>
		{/if}
		<input
			bind:value={email}
			type="text"
			class="w-full border-2 bg-slate-50 rounded-lg block mx-auto mb-2 px-2 h-12 focus:outline-none focus:ring focus:ring-sky-400"
			placeholder="Email"
		/>
		<input
			bind:value={password}
			type="password"
			class="w-full border-2 bg-slate-50 rounded-lg block mx-auto mb-6 px-2 h-12 focus:outline-none focus:ring focus:ring-sky-400"
			placeholder="Password"
		/>
		{#if errorCode}
			<Error {errorCode} />
		{/if}
		<button
			type="submit"
			on:click|preventDefault={submit}
			class="select-none w-full h-10 leading-4 mb-6 border-b-2 bg-sky-500 text-white border-sky-600 rounded-lg active:border-b px-4 py-2 active:mt-px"
			class:pointer-events-none={email === '' || password === ''}
		>
			{#if loading}
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
			{:else}
				{title}
			{/if}
		</button>
	</form>
</section>
