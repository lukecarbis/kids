<script>
	export let errorCode;
</script>

{#if errorCode === 'auth/invalid-email'}
	Invalid email.
{:else if errorCode === 'auth/user-disabled'}
	This account is disable.
{:else if errorCode === 'auth/email-already-in-use'}
	Email already in use.
{:else if errorCode === 'auth/weak-password'}
	Your password sucks.
{:else if errorCode === 'auth/too-many-requests'}
	Too many attempts. Try later.
{:else if errorCode === 'auth/user-not-found' || errorCode === 'auth/wrong-password'}
	Wrong password. Try again?
{:else}
	An error occurred. Try again?
{/if}
