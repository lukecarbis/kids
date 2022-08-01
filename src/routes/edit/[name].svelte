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
		let movedIntoCheckpoint = false;

		checkpoints.every((checkpoint, ci) => {
			// If moving a task down.
			if (direction > 0 && swap === checkpoint.fromIndex) {
				checkpoints[ci].fromIndex--;
				checkpoints[ci - 1].toIndex--;
				movedIntoCheckpoint = true;
				markJobMoved(index);
				return false;
			}

			// If moving a task up.
			if (direction < 0 && swap === checkpoint.toIndex) {
				checkpoints[ci].toIndex++;
				checkpoints[ci + 1].fromIndex++;
				movedIntoCheckpoint = true;
				markJobMoved(index);
				return false;
			}

			return true;
		});

		if (movedIntoCheckpoint) {
			return;
		}

		[jobs[index], jobs[swap]] = [jobs[swap], jobs[index]];
		markJobMoved(swap);
	};

	const removeJob = (index) => {
		jobs[index].removed = true;
		setTimeout(() => {
			checkpoints.every((checkpoint, ci) => {
				// If moving a task down.
				if (checkpoint.fromIndex >= index) {
					checkpoints[ci].toIndex--;
					if (ci > 0) {
						checkpoints[ci].fromIndex = checkpoints[ci - 1].toIndex + 1;
					}
				}

				return true;
			});

			jobs.splice(index, 1);
			jobs = jobs;
		}, 1200);
	};

	const markJobMoved = (index) => {
		jobs[index].updated = true;
		setTimeout(() => (jobs[index].updated = false), 1200);
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

		markCheckpointMoved(index);
		checkpoints = clone;
	};

	const removeCheckpoint = (index) => {
		checkpoints[index].removed = true;
		setTimeout(() => {
			const clone = [...checkpoints];
			clone[index - 1].toIndex = clone[index].toIndex;
			clone.splice(index, 1);
			checkpoints = clone;
		}, 1200);
	};

	const markCheckpointMoved = (index) => {
		checkpoints[index].updated = true;
		setTimeout(() => (checkpoints[index].updated = false), 1200);
	};
</script>

<Nav title={name} back="/edit" />

<div id="wrap" tabindex="0" class="mt-10 pb-8 font-mono select-none">
	<main class="max-w-screen-sm pt-6 mx-auto px-6 relative">
		{#each checkpoints as checkpoint, ci}
			<div class="transition-opacity duration-1000" class:opacity-0={checkpoint.removed}>
				<Flag />
			</div>
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
						<Job {job} bind:days={jobs[ji].days} />
						<Actions
							up={ji > 0}
							down={ji < jobs.length - 1 || ci < checkpoints.length - 1}
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
