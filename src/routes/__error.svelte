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
	import data from '@emoji-mart/data/sets/14/twitter.json';
	import { init } from 'emoji-mart';
	import Nav from '$lib/nav/nav-main.svelte';
	export let status; // The error code. For example "500" or "404".
	init({ data });
</script>

<Nav />

<section class="font-mono max-w-screen-sm text-center h-screen mx-auto px-6 pt-12">
	<h2 class="text-2xl mt-20">{status}</h2>
	<p class="mt-6 mb-12">
		<em-emoji set="twitter" size="32px" native="😢" />
	</p>
</section>
