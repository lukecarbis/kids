import { apiUrl } from '$lib/firebase';

export async function get({ locals, params }) {
	if (!locals.loggedIn) {
		return { status: 404 };
	}

	const { uid, idToken } = locals;

	if (!uid || !idToken) {
		return { status: 500 };
	}

	const result = await fetch(`${apiUrl}/${uid}/${params.name}.json?auth=${idToken}`);
	const body = await result.json();

	if (!body) {
		return { status: 500 };
	}

	body.name = params.name;

	return { status: 200, headers: {}, body };
}
