<script>
	export let value;
	export let name;
	export let label;
</script>

<label for={name} class="block cursor-pointer relative">
	<input
		type="radio"
		name="data"
		id={name}
		value={name}
		bind:group={value}
		class="appearance-none bg-center bg-contain cursor-pointer border-2 border-sky-400 bg-white rounded-lg w-6 h-6 relative top-1.5 focus:outline-none checked:bg-sky-400 checked:border-sky-600"
	/>
	{#if name === value}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-4 w-4 fill-white absolute left-1 top-3"
			viewBox="0 0 20 20"
			fill="currentColor"
		>
			<path
				fill-rule="evenodd"
				d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
				clip-rule="evenodd"
			/>
		</svg>
	{/if}
	{label}
</label>
