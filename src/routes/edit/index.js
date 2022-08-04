import { fetchLists } from '$lib/list';

export async function get(request) {
	return fetchLists(request);
}
