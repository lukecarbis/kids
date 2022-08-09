import { auth } from '$lib/firebase';
import { session } from '$app/stores';
import { browser } from '$app/env';
import { goto } from '$app/navigation';
import {
	createUserWithEmailAndPassword,
	updateProfile,
	sendEmailVerification,
	signInWithEmailAndPassword
} from 'firebase/auth';

export const signUp = async (name, email, password) => {
	await createUserWithEmailAndPassword(auth, email, password);
	await updateProfile(auth.currentUser, { displayName: name });
	await sendEmailVerification(auth.currentUser);
};

export const signIn = async (email, password) => {
	await signInWithEmailAndPassword(auth, email, password);
};

export const setUserCookie = async (forceReload = false) => {
	const idToken = await auth.currentUser.getIdToken();

	const user = {
		signedIn: true,
		uid: auth.currentUser.uid,
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
		idToken: idToken
	};

	const date = new Date();
	date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
	const expires = '; expires=' + date.toUTCString();

	if (browser) {
		document.cookie = 'currentUser=' + JSON.stringify(user) + expires + '; path=/';
		session.set(user);
	}

	if (forceReload) {
		goto('/');
	}
};

export const deleteUserCookie = () => {
	if (browser) {
		document.cookie = 'currentUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
		session.set({ signedIn: false });
	}
};
