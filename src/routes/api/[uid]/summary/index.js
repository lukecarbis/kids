import { apiUrl } from '$lib/firebase.js';
import { getCheckpoints } from '$lib/stores/queue.js';
import { hour } from '$lib/stores/time.js';
import { get } from 'svelte/store';

export async function get({ params }) {
	const { uid } = params;

	const lists = [];
	const listsResult = await fetch(`${apiUrl}/${uid}/lists.json`);
	const listsBody = await listsResult.json();

	Object.entries(listsBody).forEach((list) => {
		const [slug, body] = list;
		const { checkpoints } = body;
		const status = {
			done: true,
			tasksRemaining: 0
		};

		const today = getCheckpoints(checkpoints);
		today.forEach((checkpoint) => {
			if (checkpoint.visible && checkpoint.available) {
				status.tasksRemaining += checkpoint.totalTasksRemaining;
			}
		});

		if (status.tasksRemaining > 0) {
			status.done = false;
		}

		lists.push({ day: new Date().getDay(), hour: get(hour), slug, status });
	});

	return {
		status: 200,
		headers: {},
		body: { lists: lists }
	};
}
