import { auth, apiUrl } from '$lib/firebase';
import { get } from 'svelte/store';
import { queue } from '$lib/stores/queue';

export const updateTask = async (ci, ti, patch) => {
	const { uid } = auth.currentUser;
	const { id } = get(queue);
	const idToken = await auth.currentUser.getIdToken();

	await fetch(`${apiUrl}/${uid}/${id}/checkpoints/${ci}/tasks/${ti}.json?auth=${idToken}`, {
		method: 'PATCH',
		body: JSON.stringify(patch)
	});
};

export const updateTasks = async (patch) => {
	const { uid } = auth.currentUser;
	const { id } = get(queue);
	const idToken = await auth.currentUser.getIdToken();

	await fetch(`${apiUrl}/${uid}/${id}/checkpoints.json?auth=${idToken}`, {
		method: 'PATCH',
		body: JSON.stringify(patch)
	});
};

export const updateDate = async (date, listId) => {
	const uid = auth.currentUser.uid;
	const idToken = await auth.currentUser.getIdToken();

	await fetch(`${apiUrl}/${uid}/${listId}.json?auth=${idToken}`, {
		method: 'PATCH',
		body: JSON.stringify({ lastUpdated: date })
	});
};
