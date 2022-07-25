import { serialize } from 'cookie-esm';
import { auth } from '$lib/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile
} from 'firebase/auth';

export async function post({ request }) {
	const body = await request.json();
	const { signUp, name, email, password } = body;

	try {
		if (signUp) {
			// await createUserWithEmailAndPassword(auth, email, password);
			// await updateProfile(auth.currentUser, { displayName: name });
		} else {
			await signInWithEmailAndPassword(auth, email, password);
		}

		return {
			status: 200,
			headers: { 'Set-Cookie': authCookie() },
			body: {
				message: 'success',
				user: {
					uid: auth.currentUser.uid,
					name: auth.currentUser.displayName,
					email: auth.currentUser.email
				}
			}
		};
	} catch (error) {
		return {
			status: 400,
			body: { message: error.code }
		};
	}
}

export async function del() {
	try {
		await signOut(auth);

		return {
			status: 200,
			headers: { 'Set-Cookie': deAuthCookie() },
			body: { message: 'success' }
		};
	} catch (error) {
		return {
			status: 400,
			body: { message: error.code }
		};
	}
}

const authCookie = () => {
	return serialize('sessionId', auth.currentUser.stsTokenManager.accessToken, {
		httpOnly: true,
		maxAge: 60 * 60 * 24 * 30,
		sameSite: 'lax',
		path: '/'
	});
};

const deAuthCookie = () => {
	return serialize('sessionId', '', {
		expires: new Date(0),
		path: '/'
	});
};
