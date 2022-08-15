<script>
	export let checkpoint;
	export let locked;

	const getHourString = () => {
		let hourString = checkpoint.hour + ' AM';

		if (checkpoint.hour === 12) {
			hourString = checkpoint.hour + ' PM';
		} else if (checkpoint.hour - 12 > 0) {
			hourString = checkpoint.hour - 12 + ' PM';
		}

		return hourString;
	};

	$: getTasksDone = () => {
		let done = 0;
		checkpoint.tasks.forEach((task) => {
			if (task.done) {
				done++;
			}
		});
		return done;
	};

	$: getTasksTotal = () => {
		let total = 0;
		checkpoint.tasks.forEach((task) => {
			if (task.visible) {
				total++;
			}
		});
		return total;
	};

	const hour = getHourString();
</script>

<div class="checkpoint mt-6 text-center z-0">
	{#if checkpoint.hour}
		<p class="text-sm text-slate-400 pb-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4 stroke-slate-400 inline-block -top-px relative"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>

			{hour}
		</p>
	{:else}
		<p class="text-sm text-slate-500 pb-2">
			{new Date().toLocaleString('default', { dateStyle: 'long' })}
		</p>
	{/if}
	<p class="bg-white text-xl pt-2 pb-4" class:text-sky-500={!locked} class:text-slate-400={locked}>
		{checkpoint.title}
	</p>
	{#if !locked}
		<p class="text-sm text-slate-400 border-2 inline-block py-1 px-3 rounded-lg">
			{getTasksDone()} / {getTasksTotal()}
		</p>
	{/if}
</div>
