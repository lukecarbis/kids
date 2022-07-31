<script>
	import Actions from '$lib/job/actions.svelte';
	import Checkpoint from '$lib/checkpoint/checkpoint-edit.svelte';
	import Connector from '$lib/job/connector-edit.svelte';
	import Flag from '$lib/job/connector-flag.svelte';
	import Job from '$lib/job/job-edit.svelte';
	import Nav from '$lib/nav/nav-edit.svelte';

	export let name;
	export let checkpoints;
	export let jobs;

	const moveJob = (index, direction) => {
		const swap = index + direction;
		// todo: adjust checkpoints, too.
		[jobs[index], jobs[swap]] = [jobs[swap], jobs[index]];
	};

	const removeJob = (index) => {
		jobs.splice(index, 1);
		jobs = jobs;
	};

	const canMoveCheckpointUp = (checkpoint, index) => {
		if (checkpoint.fromIndex === 0) {
			return false;
		}

		const previousCheckpoint = checkpoints[index - 1];
		return previousCheckpoint.toIndex >= previousCheckpoint.fromIndex;
	};

	const canMoveCheckpointDown = (checkpoint, index) => {
		if (index === 0) {
			return false;
		}

		if (checkpoint.toIndex < checkpoint.fromIndex) {
			return false;
		}

		return checkpoint.fromIndex < jobs.length;
	};

	const moveCheckpoint = (index, direction) => {
		const clone = [...checkpoints];

		clone[index].fromIndex = clone[index].fromIndex + direction;
		clone[index - 1].toIndex = clone[index - 1].toIndex + direction;

		checkpoints = clone;
	};

	const removeCheckpoint = (index) => {
		const clone = [...checkpoints];
		clone[index - 1].toIndex = clone[index].toIndex;
		clone.splice(index, 1);
		checkpoints = clone;
	};
</script>

<Nav title={name} back="/edit" />

<div id="wrap" class="mt-10 pb-8 font-mono select-none">
	<main class="max-w-screen-sm pt-6 mx-auto px-6 relative">
		{#each checkpoints as checkpoint, ci}
			<Flag />
			<div class="checkpoint flex gap-4 items-start">
				<Checkpoint {checkpoint} />

				<Actions
					up={canMoveCheckpointUp(checkpoint, ci)}
					down={canMoveCheckpointDown(checkpoint, ci)}
					on:up={() => moveCheckpoint(ci, -1)}
					on:down={() => moveCheckpoint(ci, 1)}
					on:remove={() => removeCheckpoint(ci)}
				/>
			</div>

			<Connector
				last={checkpoint.fromIndex === jobs.length || checkpoint.toIndex < checkpoint.fromIndex}
			/>

			{#each jobs as job, index}
				{#if index >= checkpoint.fromIndex && index <= checkpoint.toIndex}
					<div class="job flex gap-4 items-start" id={`job-${index}`}>
						<Job {job} {index} />
						<Actions
							up={index > 0}
							down={index < jobs.length - 1}
							on:up={() => moveJob(index, -1)}
							on:down={() => moveJob(index, 1)}
							on:remove={() => removeJob(index)}
						/>
					</div>
					<Connector last={index === checkpoint.toIndex} />
				{/if}
			{/each}
		{/each}
	</main>
</div>
