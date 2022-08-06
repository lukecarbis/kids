import { fetchList } from '$lib/list';

export async function get(request) {
	const result = await fetchList(request);

	if (result.body) {
		delete result.body.slug;
	}

	return result;
}
