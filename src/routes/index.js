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
	const lists = await result.json();

	if (!lists) {
		return { status: 200, body: { lists: [] } };
	}

	return { status: 200, body: { lists: Object.keys(lists) } };
};
