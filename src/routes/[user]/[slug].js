import { apiUrl } from '$lib/firebase';

export async function get({ params }) {
	const { user, slug } = params;
	const result = await fetch(`${apiUrl}/.json?orderBy="slug"&equalTo="${user}"&limitToFirst=1`);
	const body = await result.json();
	const uid = Object.keys(body).shift();
	const lists = Object.values(body).shift().lists;
	const listId = Object.keys(lists).shift();
	const list = Object.values(lists)
		.filter((value) => value.slug === slug)
		.shift();

	list['id'] = listId;

	return {
		status: 200,
		headers: {},
		body: { uid, list }
	};
}
