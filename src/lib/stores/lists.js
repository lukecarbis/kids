import { get, writable } from 'svelte/store';

export const lists = writable({});

export const setListsFromDataStore = (data) => {
	let keys = Object.keys(data);
	let values = Object.values(data);
	let mapped = {};

	values.forEach((value, index) => {
		value.id = keys[index];
		mapped[value.slug] = value;
	});

	lists.set(mapped);
};

export const setCheckpointsForList = (slug, checkpoints) => {
	const updated = get(lists);
	updated[slug][checkpoints] = checkpoints;
	lists.set(updated);
};

export const saveNewList = (slug, list) => {
	const updated = get(lists);
	updated[slug] = list;
	lists.set(updated);
};
