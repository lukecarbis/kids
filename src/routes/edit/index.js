import { apiUrl } from '../../lib/firebase.js';

export const get = async ({ locals }) => {
	if (!locals.loggedIn) {
		return { status: 404 };
	}

	const { uid, idToken } = locals;

	if (!uid || !idToken) {
		return { status: 500 };
	}

	const result = await fetch(`${apiUrl}/${uid}.json?shallow=true&auth=${idToken}`);
	let queues = await result.json();

	if (!queues) {
		queues = [];
	}

	return { status: 200, body: { queues: Object.keys(queues) } };
};
