import { parse, serialize } from 'cookie-esm';
import { auth } from '$lib/firebase/admin';
import { dev } from '$app/env';

const key = import.meta.env.VITE_FIREBASE_API_KEY;
const apiUrl = 'https://identitytoolkit.googleapis.com/v1';

export const handle = async ({ event, resolve }) => {
	if (event.routeId !== '' && event.routeId !== '[name]') {
		return await resolve(event);
	}

	let { refreshToken, customToken } = parse(event.request.headers.get('cookie') || '');

	if (!refreshToken) {
		return await resolve(event);
	}

	let user = {};

	try {
		if (!customToken) throw new Error();
		user = await auth().verifyIdToken(customToken);
	} catch (e) {
		const refresh = await fetch(`${apiUrl}/token?key=${key}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ grant_type: 'refresh_token', refresh_token: refreshToken })
		});
		if (!refresh.ok) {
			return await resolve(event);
		}
		const tokens = await refresh.json();
		const idToken = tokens['id_token'];
		if (tokens['refresh_token'] !== refreshToken) return refresh;
		try {
			user = await auth().verifyIdToken(idToken);
			customToken = await auth().createCustomToken(user.uid);
			event.locals = {
				loggedIn: true,
				uid: user.user_id,
				name: user.name,
				email: user.email
			};
			event.request.headers.set({
				'Set-Cookie': [
					serialize('customToken', customToken, {
						httpOnly: true,
						maxAge: 60 * 55,
						sameSite: 'lax',
						path: '/',
						secure: !dev
					})
				]
			});
		} catch (e) {
			return await resolve(event);
		}
	}

	return await resolve(event);
};

export const getSession = ({ locals }) => {
	return {
		loggedIn: locals.loggedIn,
		uid: locals.uid,
		name: locals.name,
		email: locals.email
	};
};
