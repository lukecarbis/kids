import { apiUrl } from '$lib/firebase.js';
import { getCheckpoints, getQueue } from '$lib/stores/queue.js';

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

		getCheckpoints(checkpoints).forEach((checkpoint) => {
			if (checkpoint.visible && checkpoint.unlocked) {
				status.tasksRemaining += checkpoint.totalTasksRemaining;
			}
		});

		if (status.tasksRemaining > 0) {
			status.done = false;
		}

		lists.push({ slug, status });
	});

	return {
		status: 200,
		headers: {},
		body: { lists: lists }
	};
}
