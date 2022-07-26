import { parse } from 'cookie-esm';

export const handle = async ({ event, resolve }) => {
	const cookies = parse(event.request.headers.get('cookie') || '');

	if (cookies.currentUser) {
		event.locals = JSON.parse(cookies.currentUser);
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
