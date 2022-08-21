import { derived, get, writable } from 'svelte/store';
import { updateList } from '$lib/db';
import { getQueue, getCheckpoints, resetCheckpoints } from '$lib/stores/queue';
import { hour } from '$lib/stores/time';

function createLists() {
	const store = writable({});
	const queue = derived(
		store,
		($store) => {
			Object.entries($store).forEach(([listId, list]) => {
				let checkpoints = getCheckpoints(list.checkpoints);
				let queue = getQueue(checkpoints);

				$store[listId] = { ...list, ...queue };
				$store[listId].checkpoints = checkpoints;
			});
			return $store;
		},
		[]
	);

	return {
		set: store.set,
		update: store.update,
		subscribe: queue.subscribe,
		getId: (slug) => {
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
		},
		reset: (lists) => {
			const date = new Date().toLocaleDateString('sv');

			Object.entries(lists).forEach(([listId, list]) => {
				if (list.lastUpdated === date) {
					return;
				}
				list.checkpoints = resetCheckpoints(list.checkpoints);
				list.lastUpdated = date;
				updateList(listId, list);
			});

			store.set(lists);
		}
	};
}

export const lists = createLists();

// Refresh lists when the hour changes.
hour.subscribe(() => lists.set(get(lists)));
