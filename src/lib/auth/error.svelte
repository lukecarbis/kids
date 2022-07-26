<script>
	export let errorCode;
</script>

{#if errorCode === 'auth/invalid-email'}
	<p class="text-rose-500 text-sm mb-6 text-center">Invalid email.</p>
{:else if errorCode === 'auth/user-disabled'}
	<p class="text-rose-500 text-sm mb-6 text-center">This account is disable.</p>
{:else if errorCode === 'auth/email-already-in-use'}
	<p class="text-rose-500 text-sm mb-6 text-center">Email already in use.</p>
{:else if errorCode === 'auth/weak-password'}
	<p class="text-rose-500 text-sm mb-6 text-center">Your password sucks.</p>
{:else if errorCode === 'auth/too-many-requests'}
	<p class="text-rose-500 text-sm mb-6 text-center">Too many attempts. Try later.</p>
{:else if errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password'}
	<p class="text-rose-500 text-sm mb-6 text-center">Wrong password. Try again?</p>
{:else}
	<p class="text-rose-500 text-sm mb-6 text-center">Unable to sign in.</p>
{/if}
