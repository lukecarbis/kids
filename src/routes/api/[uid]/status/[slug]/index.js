import { apiUrl } from '$lib/firebase.js';

export async function get({ params }) {
	const { uid, slug } = params;

	const listResult = await fetch(`${apiUrl}/${uid}/lists/${slug}.json`);
	const listBody = await listResult.json();

	return {
		status: 200,
		headers: {},
		body: { lists: listBody }
	};
}
