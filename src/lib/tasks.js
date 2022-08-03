import { auth, apiUrl } from '$lib/firebase';
import { get } from 'svelte/store';
import { queue } from '$lib/stores/queue';

export const updateTask = (index, patch) => {
	const { uid } = auth.currentUser;
	const { name } = get(queue);

	auth.currentUser.getIdToken().then((idToken) => {
		fetch(`${apiUrl}/${uid}/${name}/tasks/${index}.json?auth=${idToken}`, {
			method: 'PATCH',
			body: JSON.stringify(patch)
		});
	});
};

export const updateTasks = (patch) => {
	const { uid } = auth.currentUser;
	const { name } = get(queue);

	auth.currentUser.getIdToken().then((idToken) => {
		fetch(`${apiUrl}/${uid}/${name}/tasks.json?auth=${idToken}`, {
			method: 'PATCH',
			body: JSON.stringify(patch)
		});
	});
};
