export const get = async ({ locals }) => {
	if (!locals.loggedIn) {
		return { status: 200 };
	}

	const apiUrl = 'https://kids-bdcfb-default-rtdb.asia-southeast1.firebasedatabase.app';
	const uid = locals.uid;
	const idToken = locals.idToken;

	if (!uid || !idToken) {
		return { status: 500 };
	}

	const result = await fetch(`${apiUrl}/${uid}.json?shallow=true&auth=${idToken}`);
	const names = await result.json();

	if (!names) {
		return {
			status: 200,
			body: { names: [] }
		};
	}

	return {
		status: 200,
		body: {
			names: Object.keys(names)
		}
	};
};
