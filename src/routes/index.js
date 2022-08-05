import { fetchLists } from '$lib/list';

export async function get(request) {
	const result = await fetchLists(request);

	if (result.status === 404) {
		result.status = 200;
	}

	return result;
}
