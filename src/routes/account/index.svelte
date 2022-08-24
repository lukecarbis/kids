<script>
	import { auth } from '$lib/firebase';
	import Nav from '$lib/nav/nav-back.svelte';
	import Error from '$lib/auth/error.svelte';
	import {
		sendEmailVerification,
		signInWithEmailAndPassword,
		updateEmail,
		updatePassword,
		updateProfile
	} from 'firebase/auth';

	let name = auth.currentUser.displayName;
	let email = auth.currentUser.email;
	let password = '';
	let newPassword = '';
	let repeatPassword = '';
	let saving = false;

	$: disabled = newPassword.length && newPassword !== repeatPassword;
	$: if (newPassword === '') {
		repeatPassword = '';
	}

	let status = '';
	let error = '';

	const save = async () => {
		saving = true;
		status = '';
		error = '';

		try {
			if (name !== auth.currentUser.displayName) {
				await updateProfile(auth.currentUser, { displayName: name });
			}
			if (email !== auth.currentUser.email || newPassword.length) {
				await signInWithEmailAndPassword(auth, auth.currentUser.email, password);
			}
			if (email !== auth.currentUser.email) {
				await updateEmail(auth.currentUser, email);
				await sendEmailVerification(auth.currentUser);
				password = '';
			}
			if (newPassword.length) {
				await updatePassword(auth.currentUser, newPassword);
				newPassword = '';
				password = '';
			}

			status = 'Your account details have been updated.';
		} catch (e) {
			error = e.code;
			password = '';
			newPassword = '';
		}

		saving = false;
	};
</script>

<Nav title="" back="/" />

<main id="X" class="font-mono max-w-screen-sm mx-auto mt-24 pb-8 px-6">
	<h2 class="font-bold mb-4">Account Details</h2>
	{#if status.length}
		<p class="mb-4 text-amber-500">{status}</p>
	{/if}
	{#if error.length}
		<div class="mb-4 text-rose-500">
			<Error errorCode={error} />
		</div>
	{/if}

	<div class="border-2 rounded-lg p-4 mb-8">
		<div class="flex mb-4">
			<label class="w-1/2 leading-8 font-bold" for="name">Name</label>
			<input
				id="name"
				class="w-full border-2 rounded-lg px-2 h-8 cursor-pointer focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
				bind:value={name}
			/>
		</div>
		<div class="flex mb-4">
			<label class="w-1/2 leading-8 font-bold" for="email">Email</label>
			<input
				id="email"
				class="w-full border-2 rounded-lg px-2 h-8 cursor-pointer focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
				bind:value={email}
			/>
		</div>
		<div class="flex mb-4">
			<label class="w-1/2 leading-8 font-bold" for="new">New Password</label>
			<input
				id="new"
				class="w-full border-2 rounded-lg px-2 h-8 cursor-pointer focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
				type="password"
				bind:value={newPassword}
			/>
		</div>
		{#if !newPassword.length}
			<p class="text-slate-600 text-sm">Leave this blank to keep your password the same.</p>
		{/if}
		{#if newPassword.length}
			<div class="flex">
				<label class="w-1/2 leading-8 font-bold" for="repeat">Password Again</label>
				<input
					id="repeat"
					class="w-full border-2 rounded-lg px-2 h-8 cursor-pointer focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
					type="password"
					bind:value={repeatPassword}
					class:border-rose-200={newPassword.length &&
						repeatPassword.length &&
						newPassword !== repeatPassword}
				/>
			</div>
		{/if}
	</div>
	{#if email !== auth.currentUser.email || newPassword.length}
		<div class="mb-8">
			<div class="flex mb-4">
				<label class="w-1/2 leading-8 font-bold" for="repeat">Current Password</label>
				<input
					id="password"
					class="w-full border-2 rounded-lg px-2 h-8 cursor-pointer focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
					type="password"
					bind:value={password}
				/>
			</div>
			<p class="block mb-4 text-sm">Your password is required to update your account details.</p>
		</div>
	{/if}
	{#if !saving}
		<button
			class="py-2 px-6 inline-block text-center font-bold border-2 border-b-4 border-sky-600 bg-sky-400 text-white rounded-lg"
			on:click={save}
			class:active:border-b={!disabled}
			class:active:mb-px={!disabled}
			class:active:mt-px={!disabled}
			class:bg-slate-300={disabled}
			class:border-slate-400={disabled}
			class:text-slate-100={disabled}
			{disabled}
		>
			Save
		</button>
	{:else}
		<svg
			class="animate-spin h-5 w-5 text-sky-500"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	{/if}
</main>
