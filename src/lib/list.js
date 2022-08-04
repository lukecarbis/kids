import { apiUrl } from '$lib/firebase';

export const fetchList = async ({ locals, params }) => {
	if (!locals.loggedIn) {
		return { status: 404 };
	}

	const { uid, idToken } = locals;
	const { name } = params;

	if (!uid || !idToken || !name) {
		return { status: 500 };
	}

	const result = await fetch(
		`${apiUrl}/${uid}.json?orderBy="slug"&equalTo="${name}"&auth=${idToken}`
	);
	const body = await result.json();

	if (!body) {
		return { status: 500 };
	}
	const listId = Object.keys(body)[0];
	const list = body[listId];
	list.id = listId;

	return { status: 200, headers: {}, body: list };
};

export const fetchLists = async ({ locals }) => {
	if (!locals.loggedIn) {
		return { status: 404 };
	}

	const { uid, idToken } = locals;

	if (!uid || !idToken) {
		return { status: 500 };
	}

	const result = await fetch(`${apiUrl}/${uid}.json?auth=${idToken}`);
	let body = await result.json();

	if (!body) {
		return { status: 200, body: { lists: [] } };
	}

	let keys = Object.keys(body);
	let lists = Object.values(body);

	lists = lists.map((list, index) => {
		list.id = keys[index];
		return list;
	});

	return { status: 200, body: { lists } };
};
