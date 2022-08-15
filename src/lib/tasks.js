import { apiUrl, auth } from '$lib/firebase';
import { get } from 'svelte/store';
import { queue } from '$lib/stores/queue';
import { meta } from '$lib/stores/meta';

export const updateTask = async (ci, ti, patch) => {
	let { uid } = get(meta);
	const { id } = get(queue);

	// If no User ID is defined, see if there's a signed-in user we can use.
	if (!uid) {
		uid = auth.currentUser.uid;
	}

	await fetch(`${apiUrl}/${uid}/lists/${id}/checkpoints/${ci}/tasks/${ti}.json`, {
		method: 'PATCH',
		body: JSON.stringify(patch)
	});
};

export const updateTasks = async (patch) => {
	let { uid } = get(meta);
	const { id } = get(queue);

	// If no User ID is defined, see if there's a signed-in user we can use.
	if (!uid) {
		uid = auth.currentUser.uid;
	}

	await fetch(`${apiUrl}/${uid}/lists/${id}/checkpoints.json`, {
		method: 'PATCH',
		body: JSON.stringify(patch)
	});
};

export const updateDate = async (date, listId) => {
	const { uid } = get(meta);

	await fetch(`${apiUrl}/${uid}/lists/${listId}.json`, {
		method: 'PATCH',
		body: JSON.stringify({ lastUpdated: date })
	});
};
