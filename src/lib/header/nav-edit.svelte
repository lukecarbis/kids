<script>
	export let name;
</script>

<header
	class="px-6 py-5 w-full top-0 z-10 font-mono flex items-stretch justify-between border-b-2 border-b-slate-200 bg-white fixed"
>
	<a href="/edit" class="w-10">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 stroke-sky-500"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
		</svg>
	</a>
	<h2 class="flex-auto text-center font-bold pr-10">{name}</h2>
</header>
