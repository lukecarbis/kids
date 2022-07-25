import { parse } from 'cookie-esm';
import { auth } from '$lib/firebase';

export const handle = async ({ event, resolve }) => {
	const cookies = parse(event.request.headers.get('cookie') || '');
	event.request.headers.set('Access-Control-Allow-Origin', '*');

	if (
		!cookies.sessionId ||
		!auth.currentUser ||
		cookies.sessionId !== auth.currentUser.stsTokenManager.accessToken
	) {
		event.locals = { loggedIn: false };
	} else {
		event.locals = {
			loggedIn: true,
			uid: auth.currentUser.uid,
			name: auth.currentUser.displayName,
			email: auth.currentUser.email
		};
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
