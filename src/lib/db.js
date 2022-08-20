import { auth, db } from '$lib/firebase';
import { get } from 'svelte/store';
import { meta } from '$lib/stores/meta';
import { push, ref, remove, set, update } from 'firebase/database';

const getUid = () => {
	let { uid } = get(meta);

	// If no User ID is defined, see if there's a signed-in user we can use.
	if (!uid) {
		uid = auth.currentUser.uid;
	}

	return uid;
};

export const updateTask = async (listId, ci, ti, patch) => {
	const uid = getUid();
	await update(ref(db, `${uid}/lists/${listId}/checkpoints/${ci}/tasks/${ti}`), patch);
};

export const updateTasks = async (listId, patch) => {
	const uid = getUid();
	await update(ref(db, `${uid}/lists/${listId}/checkpoints`), patch);
};

export const updateDate = async (listId, date) => {
	const uid = getUid();

	await set(ref(db, `${uid}/lists/${listId}/lastUpdated`), date);
};

export const updateSlug = async (listId, slug) => {
	const uid = getUid();

	await set(ref(db, `${uid}/lists/${listId}/slug`), slug);
};

export const updateUserSlug = async (slug) => {
	const uid = getUid();

	await set(ref(db, `${uid}/slug`), slug);
};

export const updateList = async (listId, { checkpoints, lastUpdated }) => {
	await updateDate(listId, lastUpdated);

	const patch = {};

	checkpoints.forEach((checkpoint, ci) => {
		checkpoint.tasks.forEach((task, ti) => {
			patch[`${ci}/tasks/${ti}/skipped`] = false;
			patch[`${ci}/tasks/${ti}/done`] = false;
			patch[`${ci}/tasks/${ti}/visible`] = true;
		});
	});

	await updateTasks(listId, patch);
};

export const newList = async (list) => {
	const uid = getUid();
	const listId = push(ref(db, `${uid}/lists`)).key;

	await set(ref(db, `${uid}/lists/${listId}`), list);
	await updateList(listId, list);

	return listId;
};

export const newListSlug = () => {
	return Math.random().toString(36).slice(-6).toLowerCase();
};

export const deleteList = async (listId) => {
	const uid = getUid();
	await remove(ref(db, `${uid}/lists/${listId}`));
};
