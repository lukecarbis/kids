<script context="module">
	export function load({ status }) {
		return {
			props: {
				status
			}
		};
	}
</script>

<script>
	import Nav from '$lib/nav/nav-main.svelte';
	import Error from '$lib/welcome/error.svelte';
	export let status; // The error code. For example "500" or "404".
</script>

<Nav />
<Error code={status} />
