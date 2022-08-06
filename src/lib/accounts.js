import { browser } from '$app/env';
import { auth } from '$lib/firebase';
import {
	createUserWithEmailAndPassword,
	updateProfile,
	sendEmailVerification,
	signInWithEmailAndPassword
} from 'firebase/auth';

let refreshTokenTimeout;

export const signUp = async (name, email, password) => {
	await createUserWithEmailAndPassword(auth, email, password);
	await updateProfile(auth.currentUser, { displayName: name });
	await sendEmailVerification(auth.currentUser);
	await setCookie();
};

export const signIn = async (email, password) => {
	await signInWithEmailAndPassword(auth, email, password);
	await setCookie();
};

export const refreshToken = async (time) => {
	// Refresh session.
	const currentTime = new Date().getTime();
	const fiveMinutesInMilliseconds = 1000 * 60 * 5;

	// If it's been 5 minutes.
	if (currentTime - time >= fiveMinutesInMilliseconds) {
		await setCookie();
		if (browser) {
			clearTimeout(refreshTokenTimeout);
			refreshTokenTimeout = setTimeout(refreshToken, fiveMinutesInMilliseconds, currentTime);
		}
	}
};

export const setCookie = async () => {
	const idToken = await auth.currentUser.getIdToken();

	await fetch('/api/auth', {
		method: 'POST',
		body: JSON.stringify({
			loggedIn: true,
			uid: auth.currentUser.uid,
			name: auth.currentUser.displayName,
			email: auth.currentUser.email,
			time: new Date().getTime(),
			idToken: idToken
		}),
		headers: { 'Content-Type': 'application/json' }
	});
};
