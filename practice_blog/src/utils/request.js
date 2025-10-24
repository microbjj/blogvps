export async function request(url, method, data) {
	return fetch(`/api${url}`, {
		headers: {
			'Content-Type': 'Application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	}).then((res) => res.json())
}
