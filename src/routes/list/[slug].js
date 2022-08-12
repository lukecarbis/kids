import { apiUrl } from '$lib/firebase';

export async function get({ params }) {
	const { uid, slug } = params;
	const result = await fetch(
		`${apiUrl}/${uid}.json?orderBy="slug"&equalTo="${slug}"&limitToFirst=1`
	);
	const body = await result.json();
	console.log(body);
	return {
		status: 200,
		headers: {},
		body: body
	};
}
