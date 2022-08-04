import { auth, apiUrl } from '$lib/firebase';
import { get } from 'svelte/store';
import { queue } from '$lib/stores/queue';

export const updateTask = (checkpointIndex, taskIndex, patch) => {
	const { uid } = auth.currentUser;
	const { id } = get(queue);

	auth.currentUser.getIdToken().then((idToken) => {
		fetch(
			`${apiUrl}/${uid}/${id}/checkpoints/${checkpointIndex}/tasks/${taskIndex}.json?auth=${idToken}`,
			{
				method: 'PATCH',
				body: JSON.stringify(patch)
			}
		);
	});
};

export const updateTasks = (checkpointIndex, patch) => {
	const { uid } = auth.currentUser;
	const { id } = get(queue);

	auth.currentUser.getIdToken().then((idToken) => {
		fetch(`${apiUrl}/${uid}/${id}/checkpoints.json?auth=${idToken}`, {
			method: 'PATCH',
			body: JSON.stringify(patch)
		});
	});
};
