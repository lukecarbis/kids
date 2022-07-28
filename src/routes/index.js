import { apiUrl } from '../lib/firebase.js';

export const get = async ({ locals }) => {
	if (!locals.loggedIn) {
		return { status: 200 };
	}

	const { uid, idToken } = locals;

	if (!uid || !idToken) {
		return { status: 500 };
	}

	const result = await fetch(`${apiUrl}/${uid}.json?shallow=true&auth=${idToken}`);
	const queues = await result.json();

	if (!queues) {
		return {
			status: 200,
			body: { queues: [] }
		};
	}

	return {
		status: 200,
		body: {
			queues: Object.keys(queues)
		}
	};
};
