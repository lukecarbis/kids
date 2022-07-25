<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				message: error.message,
				status
			}
		};
	}
</script>

<script>
	import { emojiCode } from '$lib/helpers/emoji-code.js';
	import Nav from '$lib/header/nav-main.svelte';
	export let status; // The error code. For example "500" or "404".
	export let message; // The error message. For example "Not found."
</script>

<Nav />

<section class="font-mono max-w-screen-sm text-center h-screen mx-auto px-6 pt-12">
	<h2 class="text-2xl mt-20">{status}</h2>
	<p class="mt-6 mb-12">
		<img src="/openmoji/{emojiCode('😢')}.svg" alt="😢" class="mx-auto h-20 w-20" />
	</p>
</section>
