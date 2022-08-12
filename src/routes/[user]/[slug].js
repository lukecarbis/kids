import { apiUrl } from '$lib/firebase';

export async function get({ params }) {
	const { user, slug } = params;
	const result = await fetch(`${apiUrl}/.json?orderBy="slug"&equalTo="${user}"&limitToFirst=1`);
	const body = await result.json();
	const uid = Object.keys(body).shift();

	const lists = Object.values(body).shift().lists;
	const listIds = Object.keys(lists);

	let list = {};
	Object.values(lists).every((value, index) => {
		if (value.slug === slug) {
			list = value;
			list['id'] = listIds[index];
			return false;
		}
		return true;
	});

	return {
		status: 200,
		headers: {},
		body: { uid, list }
	};
}
