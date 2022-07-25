import { serialize } from 'cookie-esm';
import { signUserOut } from '$lib/firebase';

export async function post() {
	try {
		await signUserOut();

		return {
			status: 200,
			headers: {
				'Set-Cookie': serialize('sessionId', '', {
					expires: new Date(0),
					path: '/'
				})
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
