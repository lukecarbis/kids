import { serialize } from 'cookie-esm';

export async function post({ request }) {
	const user = await request.json();

	return {
		status: 200,
		headers: {
			'Set-Cookie': serialize('currentUser', JSON.stringify(user), {
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 30,
				sameSite: 'lax',
				path: '/'
			})
		},
		body: { message: 'success' }
	};
}

export async function del() {
	return {
		status: 200,
		headers: {
			'Set-Cookie': serialize('currentUser', '', {
				expires: new Date(0),
				path: '/'
			})
		},
		body: { message: 'success' }
	};
}
