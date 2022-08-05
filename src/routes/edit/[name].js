import { fetchList } from '$lib/list';

export async function get(request) {
	const result = await fetchList(request);

	delete result.body.slug;
	delete result.body.lastUpdated;

	return result;
}
