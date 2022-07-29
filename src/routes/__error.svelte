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
	import { emojiCode } from '$lib/helpers/emoji-code';
	import Nav from '$lib/nav/nav-main.svelte';
	export let status; // The error code. For example "500" or "404".
</script>

<Nav />

<section class="font-mono max-w-screen-sm text-center h-screen mx-auto px-6 pt-12">
	<h2 class="text-2xl mt-20">{status}</h2>
	<p class="mt-6 mb-12">
		<img src="/openmoji/{emojiCode('😢')}.svg" alt="😢" class="mx-auto h-20 w-20" />
	</p>
</section>
