<script>
	export let job;
</script>

<div
	class="px-4 py-2 border-2 rounded-lg flex flex-wrap border-slate-200 items-stretch justify-between rounded-lg snap-always snap-start scroll-mt-6"
>
	<span class="mr-4 text-center w-6 h-10 py-2">
		{job.emoji}
	</span>
	<h2 class="flex-auto text-center mr-10 leading-10">
		{job.title}
	</h2>
	{#if job.skipped}
		<button class="border border-b-2 active:mt-px active:border-b rounded-lg px-4 py-1">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 stroke-sky-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
				/>
			</svg>
		</button>
	{/if}
</div>
