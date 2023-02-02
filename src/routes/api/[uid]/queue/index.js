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
		// const queue = getQueue(getCheckpoints(checkpoints));

		lists.push({ slug, checkpoints: getCheckpoints(checkpoints) });
	});

	return {
		status: 200,
		headers: {},
		body: { lists: lists }
	};
}
