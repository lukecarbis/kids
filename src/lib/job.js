import { auth, apiUrl } from '$lib/firebase';
import { get } from 'svelte/store';
import { queue } from '$lib/stores/queue';

export const updateJob = (index, patch) => {
	const { uid } = auth.currentUser;
	const { name } = get(queue);

	auth.currentUser.getIdToken().then((idToken) => {
		fetch(`${apiUrl}/${uid}/${name}/jobs/${index}.json?auth=${idToken}`, {
			method: 'PATCH',
			body: JSON.stringify(patch)
		});
	});
};

export const updateJobs = (patch) => {
	const { uid } = auth.currentUser;
	const { name } = get(queue);

	auth.currentUser.getIdToken().then((idToken) => {
		fetch(`${apiUrl}/${uid}/${name}/jobs.json?auth=${idToken}`, {
			method: 'PATCH',
			body: JSON.stringify(patch)
		});
	});
};
