import { auth } from '$lib/firebase';
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
	await setCookie();
};

export const signIn = async (email, password) => {
	await signInWithEmailAndPassword(auth, email, password);
	await setCookie();
};

const setCookie = async () => {
	const idToken = await auth.currentUser.getIdToken();

	await fetch('/api/auth', {
		method: 'POST',
		body: JSON.stringify({
			loggedIn: true,
			uid: auth.currentUser.uid,
			name: auth.currentUser.displayName,
			email: auth.currentUser.email,
			idToken: idToken
		}),
		headers: { 'Content-Type': 'application/json' }
	});
};
