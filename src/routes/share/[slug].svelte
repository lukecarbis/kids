<script>
	import { lists } from '$lib/stores/lists';
	import { meta } from '$lib/stores/meta';
	import { updateSlug } from '$lib/db';
	import Nav from '$lib/nav/nav-back.svelte';
	import { goto } from '$app/navigation';

	export let slug;
	const listId = lists.getId(slug);

	$: name = $lists[listId].name;

	let copied = false;
	let loading = false;

	const getUrl = (listSlug) => {
		return (
			window.location.protocol + window.location.host + '/' + $meta.slug + '/' + listSlug + '/'
		);
	};

	let url = getUrl(slug);

	const copy = () => {
		navigator.clipboard.writeText(url);
		copied = true;
		setTimeout(() => (copied = false), 1800);
	};

	const share = () => {
		let shareData = {
			title: '[TBD]',
			text: `Hey ${name} – bookmark this link to get your daily list on [TBD].`,
			url: new URL(url).pathname
		};
		navigator.share(shareData).catch(() => {
			// Do nothing, but prevent a console "Unhandled Promise" error.
		});
	};

	const regenerate = async () => {
		loading = true;

		const newSlug = Math.random().toString(36).slice(-6).toLowerCase();

		$lists[listId].slug = newSlug;
		updateSlug(listId, newSlug);

		url = getUrl(newSlug);
		await goto(`/share/${newSlug}`);

		loading = false;
	};
</script>

<Nav title="" back="/" />

<main class="flex flex-wrap max-w-screen-sm font-mono mt-24 pb-8 mx-auto px-6 left">
	<p class="mb-6">
		Share this link so that <strong>{name}</strong> can start using <strong>[TBD]</strong> on a separate
		device.
	</p>
	<div class="p-6 border-2 border-sky-300 bg-sky-100 rounded-lg mb-6">
		<p class="text-sm">
			To make things simple, there's no password login. Instead, this unique link has been generated
			especially for {name}.
		</p>
	</div>
	<div class="flex w-full mb-6">
		<input
			type="text"
			bind:value={url}
			class="flex-grow text-slate-500 border-2 rounded-lg p-2 mr-6 w-full focus:border-sky-400 focus:drop-shadow-none focus:outline-none"
			on:focus={(event) => setTimeout(() => event.target.select(), 10)}
		/>
		<button
			class="py-2 px-6 inline-block text-center font-bold border-2 border-b-4 border-sky-600 bg-sky-400 text-white rounded-lg active:border-b-2 active:mt-px active:mb-px"
			on:click={copy}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				{#if copied}
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
				{:else}
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
					/>
				{/if}
			</svg>
		</button>
	</div>
	<button
		class="py-2 px-6 inline-block text-center font-bold border-2 border-b-4 border-sky-600 bg-sky-400 text-white rounded-lg active:border-b-2 active:mt-px active:mb-px"
		on:click={share}
	>
		Share with {name}
	</button>
	<hr class="border-y w-full my-12" />
	<h2 class="font-bold mb-6">Regenerate Link</h2>
	<p class="mb-4">Do you need to generate a new unique link? No problem!</p>
	<p class="mb-6">
		<span class="bg-amber-100">The old link will stop working</span>, so you will need to share the
		new link with {name}.
	</p>
	{#if !loading}
		<button
			class="py-2 px-6 inline-block text-center font-bold border-2 border-b-4 border-amber-300 bg-amber-100 text-amber-500 rounded-lg active:border-b-2 active:mt-px active:mb-px"
			on:click={regenerate}
		>
			Regenerate Link
		</button>
	{:else}
		<svg
			class="animate-spin h-5 w-5 text-amber-500"
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
	{/if}
</main>
