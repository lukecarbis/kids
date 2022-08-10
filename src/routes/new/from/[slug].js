export function get({ params }) {
	const { slug } = params;
	return {
		status: 200,
		headers: {},
		body: { slug }
	};
}
