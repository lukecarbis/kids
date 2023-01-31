import { apiUrl } from '$lib/firebase.js';

export async function get({ params }) {
	const { uid } = params;

	const listsResult = await fetch(`${apiUrl}/${uid}/lists.json`);
	const listsBody = await listsResult.json();

	return {
		status: 200,
		headers: {},
		body: { lists: listsBody }
	};
}
