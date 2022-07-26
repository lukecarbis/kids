import { serialize } from 'cookie-esm';
import { auth } from '$lib/firebase/admin';
import { dev } from '$app/env';

const key = import.meta.env.VITE_FIREBASE_API_KEY;
const apiUrl = 'https://identitytoolkit.googleapis.com/v1';

export async function post({ request }) {
	const { signUp, name, email, password } = await request.json();

	let endpoint = 'accounts:signInWithPassword';
	if (signUp) {
		endpoint = 'accounts:signUp';
	}

	const identityRequest = await fetch(`${apiUrl}/${endpoint}?key=${key}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password, returnSecureToken: true })
	});

	const id = await identityRequest.json();

	const { error, idToken, refreshToken } = id;

	if (!identityRequest.ok) {
		return {
			status: 400,
			body: error
		};
	}

	if (signUp) {
		await fetch(`${apiUrl}/accounts:update?key=${key}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ idToken, displayName: name })
		});
		await fetch(`${apiUrl}/accounts:update?sendOobCode=${key}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ idToken, requestType: 'VERIFY_EMAIL' })
		});
	}

	const customToken = await auth().createCustomToken(id.localId);

	return {
		status: 200,
		headers: {
			'Set-Cookie': [
				serialize('refreshToken', refreshToken, {
					httpOnly: true,
					maxAge: 60 * 60 * 24 * 30,
					sameSite: 'lax',
					path: '/',
					secure: !dev
				}),
				serialize('customToken', customToken, {
					httpOnly: true,
					maxAge: 60 * 55,
					sameSite: 'lax',
					path: '/',
					secure: !dev
				})
			]
		},
		body: {
			message: 'success',
			user: {
				uid: id.localId,
				name: id.displayName,
				email: id.email
			}
		}
	};
}

export async function del() {
	try {
		return {
			status: 200,
			headers: {
				'Set-Cookie': [
					serialize('refreshToken', '', {
						expires: new Date(0),
						path: '/'
					}),
					serialize('customToken', '', {
						expires: new Date(0),
						path: '/'
					})
				]
			},
			body: { message: 'success' }
		};
	} catch (error) {
		return {
			status: 400,
			body: { message: error.code }
		};
	}
}
