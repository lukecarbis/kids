<script>
	import { signUserOut } from '$lib/firebase';
</script>

<button on:click={signUserOut} class="block mx-auto text-sky-500">Log Out</button>
