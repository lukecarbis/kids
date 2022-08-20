import { apiUrl } from '$lib/firebase';

export async function get({ params }) {
	const { user, slug } = params;
	const uidResult = await fetch(`${apiUrl}/.json?orderBy="slug"&equalTo="${user}"&limitToFirst=1`);
	const uidBody = await uidResult.json();
	const uid = Object.keys(uidBody).shift();

	const listIdResult = await fetch(
		`${apiUrl}/${uid}/lists.json?orderBy="slug"&equalTo="${slug}"&limitToFirst=1`
	);
	const listIdBody = await listIdResult.json();
	const listId = Object.keys(listIdBody).shift();

	return {
		status: 200,
		headers: {},
		body: { uid, listId }
	};
}
