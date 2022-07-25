import { serialize } from 'cookie-esm';
import { auth, createUser, updateUserDisplayName, signUserIn } from '$lib/firebase';

export async function post({ request }) {
	const body = await request.json();
	const { signUp, name, email, password } = body;

	try {
		if (signUp) {
			await createUser(email, password);
			await updateUserDisplayName(name);
		} else {
			await signUserIn(email, password);
		}

		return {
			status: 200,
			headers: {
				'Set-Cookie': serialize('sessionId', auth.currentUser.stsTokenManager.accessToken, {
					httpOnly: true,
					maxAge: 60 * 60 * 24 * 30,
					sameSite: 'lax',
					path: '/'
				})
			},
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
