<script>
	export let errorCode;
</script>

{#if errorCode === 'INVALID_EMAIL'}
	<p class="text-rose-500 text-sm mb-6 text-center">Invalid email.</p>
{:else if errorCode === 'USER_DISABLED'}
	<p class="text-rose-500 text-sm mb-6 text-center">This account is disable.</p>
{:else if errorCode === 'EMAIL_EXISTS'}
	<p class="text-rose-500 text-sm mb-6 text-center">Email already in use.</p>
{:else if errorCode === 'WEAK_PASSWORD'}
	<p class="text-rose-500 text-sm mb-6 text-center">Your password sucks.</p>
{:else if errorCode === 'TOO_MANY_ATTEMPTS_TRY_LATER'}
	<p class="text-rose-500 text-sm mb-6 text-center">Too many attempts. Try later.</p>
{:else if errorCode === 'USER_NOT_FOUND' || errorCode === 'INVALID_PASSWORD'}
	<p class="text-rose-500 text-sm mb-6 text-center">Wrong password. Try again?</p>
{:else}
	<p class="text-rose-500 text-sm mb-6 text-center">Unable to sign in.</p>
{/if}
