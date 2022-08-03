import { fetchList } from '$lib/list';

export async function get(request) {
	return fetchList(request);
}
