export async function get({ locals }) {
	if (!locals.loggedIn) {
		return { status: 200 };
	}

	const apiUrl = 'https://kids-bdcfb-default-rtdb.asia-southeast1.firebasedatabase.app';
	const uid = locals.uid;
	const idToken = locals.idToken;

	if (!uid || !idToken) {
		return { status: 500 };
	}

	const result = await fetch(`${apiUrl}/${uid}.json?auth=${idToken}`);
	const body = await result.json();

	if (!body) {
		return { status: 500 };
	}

	return {
		status: 200,
		headers: {},
		body: {
			slugs: Object.keys(body),
			queues: Object.values(body)
		}
	};
}
