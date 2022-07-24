<script>
	export let streak;
	let open = false;
</script>

<div class="streak flex w-10 justify-end align-center">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-6 w-6 fill-amber-400 stroke-orange-500 cursor-pointer"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		stroke-width="2"
		on:click={() => (open = !open)}
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
		/>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
		/>
	</svg>
	<div
		class="absolute left-0 top-16 overflow-hidden transition-all text-center px-6 mt-px w-full border-b-slate-200 bg-white"
		class:h-0={!open}
		class:opacity-0={!open}
		class:h-auto={open}
		class:opacity-100={open}
		class:py-6={open}
		class:border-b-2={open}
	>
		<p>
			You're on a <span class="text-orange-500 font-bold">{streak} day streak</span>! Keep it up!
		</p>
		<button
			class="bg-sky-500 text-white px-4 mt-4 h-8 rounded-lg text-xs border-b-2 border-sky-600 active:border-b-0 active:top-px relative"
			on:click={() => (open = !open)}
		>
			Close
		</button>
	</div>
</div>
