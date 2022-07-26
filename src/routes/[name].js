export async function get({ locals, params }) {
	if (!locals.loggedIn) {
		return { status: 404 };
	}

	const apiUrl = 'https://kids-bdcfb-default-rtdb.asia-southeast1.firebasedatabase.app';
	const slug = params.name;
	const uid = locals.uid;
	const idToken = locals.idToken;

	if (!slug || !uid || !idToken) {
		return { status: 500 };
	}

	const result = await fetch(`${apiUrl}/${uid}/${slug}.json?auth=${idToken}`);
	const body = await result.json();

	if (!body) {
		return { status: 500 };
	}

	return {
		status: 200,
		headers: {},
		body
	};
}
