import { request } from '@/utils'

export const removePostAsync = (id) => async () => {
	await request(`/posts/${id}`, 'DELETE')
}
