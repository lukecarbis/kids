<script>
	export let name;
</script>

<input
	class="block border-2 rounded-lg mb-4 p-2 w-full text-center focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
	type="text"
	placeholder="First Name"
	bind:value={name}
/>
