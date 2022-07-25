<script>
	import Nav from '$lib/header/nav-main.svelte';
	import Form from '$lib/auth/form.svelte';
</script>

<br /><br /><br /><br /><br />
<p>api key: {import.meta.env.VITE_FIREBASE_API_KEY}</p>
<p>auth domain: {import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}</p>
<p>project id: {import.meta.env.VITE_FIREBASE_PROJECT_ID}</p>
<p>storage bucket: {import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}</p>
<p>sender id: {import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID}</p>
<p>firebase app: {import.meta.env.VITE_FIREBASE_APP_ID}</p>

<Nav />
<Form />
