import { fetchLists } from '$lib/list';

export async function get(request) {
	const test = await fetchLists(request);

	if (test.status === 404) {
		test.status = 200;
	}

	return test;
}
