<script>
	import sample from '$lib/sample.json';
	import empty from '$lib/empty.json';
	import { auth, apiUrl } from '$lib/firebase';
	import { goto } from '$app/navigation';

	let name = '';
	let loading = false;
	let useSampleData = true;

	const setDefaults = async () => {
		loading = true;

		const idToken = await auth.currentUser.getIdToken();
		const uid = auth.currentUser.uid;
		const data = useSampleData ? sample : empty;

		await fetch(`${apiUrl}/${uid}.json?auth=${idToken}`, {
			method: 'PATCH',
			body: JSON.stringify({
				[name]: data
			})
		});

		loading = false;
		await goto(`/edit/${name}`);
	};
</script>

<input
	class="block border-2 rounded-lg mb-4 p-2 w-full text-center focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
	type="text"
	placeholder="First Name"
	bind:value={name}
/>

<div class="flex-grow mb-4">
	<button
		class="py-2 px-6 relative font-bold border-2 border-b-4 rounded-lg w-full active:border-b-2 active:mt-px active:mb-px"
		class:bg-sky-400={name.length >= 2}
		class:bg-slate-50={name.length < 2}
		class:text-white={name.length >= 2}
		class:text-slate-300={name.length < 2}
		class:border-sky-600={name.length >= 2}
		class:border-slate-300={name.length < 2}
		class:pointer-events-none={name.length < 2}
		on:click={setDefaults}
	>
		{#if loading}
			<svg
				class="animate-spin mx-auto h-6 w-6 text-white"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
		{:else}
			Next
		{/if}
	</button>
</div>

<label for="use-sample-data" class="w-full flex relative items-center cursor-pointer mb-6">
	<input type="checkbox" bind:checked={useSampleData} id="use-sample-data" class="sr-only peer" />
	<div
		class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-400"
	/>
	<span class="ml-3 text-slate-800">Use Sample Data</span>
</label>

<div class="p-6 border-2 border-sky-300 bg-sky-100 rounded-lg">
	<p class="text-sm">
		<strong>[TBD]</strong> is designed to help keep track of daily chores, schoolwork, and other activities.
		We don't collect any other information.
	</p>
</div>
