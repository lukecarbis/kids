import { get, writable } from 'svelte/store';
import { browser } from '$app/env';

let listsStore = [];
if (browser) {
	listsStore = browser ? JSON.parse(localStorage.getItem('lists')) : [];
}

export const lists = writable(listsStore);

lists.subscribe((value) => {
	if (browser) {
		localStorage.lists = JSON.stringify(value);
	}
});

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
