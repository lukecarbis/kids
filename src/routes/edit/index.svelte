<script>
	import Nav from '$lib/nav/nav-edit.svelte';

	export let lists = [];
</script>

<Nav title="" back="/" />

<div
	id="wrap"
	class="h-calc mt-16 pb-8 font-mono select-none overflow-y-scroll snap-y snap-mandatory"
>
	{#if lists.length}
		{#each lists as list}
			<div class="border-b even:bg-slate-50">
				<div class="max-w-screen-sm mx-auto flex items-center py-6 px-6">
					<p class="flex-grow">{list.name}</p>
					<a
						href="/new/from/{list.slug}"
						class="border border-b-2 bg-white rounded-lg text-sm ml-4 px-4 py-1 h-6 leading-6 box-content active:border-b active:mt-px"
					>
						Duplicate
					</a>
					<a
						href="/edit/{list.slug}"
						class="border border-b-2 bg-white rounded-lg text-sm ml-4 px-4 py-1 h-6 leading-6 box-content active:border-b active:mt-px"
					>
						Edit
					</a>
				</div>
			</div>
		{/each}
	{/if}
	<div class="p-6 max-w-screen-sm mx-auto">
		<a
			href="/new"
			class="py-2 px-6 inline-block text-center font-bold border-2 border-b-4 border-sky-600 bg-sky-400 text-white rounded-lg active:border-b-2 active:mt-px active:mb-px"
		>
			Add New List
		</a>
	</div>
</div>
