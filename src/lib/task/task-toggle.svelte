<script>
	import Toggle from '$lib/task/buttons/toggle.svelte';
	export let task;
	export let loading = false;
</script>

<div
	class="p-4 border-2 rounded-lg flex flex-wrap items-stretch justify-between rounded-lg"
	class:border-slate-200={!task.done}
	class:border-emerald-400={task.done}
	class:bg-emerald-50={task.done}
>
	<span class="mr-4 text-center w-6">
		<em-emoji set="twitter" size="24px" native={task.emoji} />
	</span>
	<h3 class="flex-1 text-center">
		{#if task.done}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 inline-block mr-1 stroke-emerald-500"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
			</svg>
		{/if}
		{task.title}
	</h3>
	<Toggle bind:done={task.done} {loading} on:toggle />
</div>
