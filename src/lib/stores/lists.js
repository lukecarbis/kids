import { get, writable } from 'svelte/store';

export const lists = writable({});

export const getListId = (slug) => {
	const listsEntries = Object.entries(get(lists));

	if (!listsEntries.length) {
		return {};
	}

	return listsEntries
		.filter(([, list]) => {
			return list.slug === slug;
		})
		.shift()
		.shift();
};
