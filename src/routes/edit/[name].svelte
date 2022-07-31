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

	const addJob = (index) => {
		const emptyJob = {
			days: [true, true, true, true, true, false, false],
			description: '',
			emoji: '😁',
			title: ''
		};
		jobs.splice(index, 0, emptyJob);
		jobs = jobs;
	};

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

	const addCheckpoint = (ci, ji) => {
		let toIndex = jobs.length - 1;
		if (ci + 1 in checkpoints) {
			toIndex = checkpoints[ci + 1].fromIndex - 1;
		}
		checkpoints[ci].toIndex = ji - 1;
		const emptyCheckpoint = {
			description: '',
			fromIndex: ji,
			hour: 0,
			title: '',
			toIndex: toIndex
		};
		checkpoints.splice(ci + 1, 0, emptyCheckpoint);
		checkpoints = checkpoints;
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

<div id="wrap" tabindex="0" class="mt-10 pb-8 font-mono select-none">
	<main class="max-w-screen-sm pt-6 mx-auto px-6 relative">
		{#each checkpoints as checkpoint, ci}
			<Flag />
			<div class="checkpoint flex gap-4 items-start">
				<Checkpoint {checkpoint} />

				<Actions
					up={canMoveCheckpointUp(checkpoint, ci)}
					down={canMoveCheckpointDown(checkpoint, ci)}
					remove={0 !== ci}
					on:up={() => moveCheckpoint(ci, -1)}
					on:down={() => moveCheckpoint(ci, 1)}
					on:remove={() => removeCheckpoint(ci)}
				/>
			</div>

			<Connector
				last={checkpoint.fromIndex === jobs.length || checkpoint.toIndex < checkpoint.fromIndex}
				on:addCheckpoint={() => addCheckpoint(ci, checkpoint.fromIndex)}
				on:addTask={() => addJob(checkpoint.fromIndex)}
			/>

			{#each jobs as job, ji}
				{#if ji >= checkpoint.fromIndex && ji <= checkpoint.toIndex}
					<div class="job flex gap-4 items-start" id={`job-${ji}`}>
						<Job {job} {ji} bind:days={jobs[ji].days} />
						<Actions
							up={ji > 0}
							down={ji < jobs.length - 1}
							on:up={() => moveJob(ji, -1)}
							on:down={() => moveJob(ji, 1)}
							on:remove={() => removeJob(ji)}
						/>
					</div>
					<Connector
						last={ji === checkpoint.toIndex}
						on:addCheckpoint={() => addCheckpoint(ci, ji + 1)}
						on:addTask={() => addJob(ji + 1)}
					/>
				{/if}
			{/each}
		{/each}
	</main>
</div>
