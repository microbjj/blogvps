import { setPostData } from '@/actions/set-post-data'
import { request } from '@/utils'

export const savePostAsync = (id, newPostData) => async (dispatch) => {
	const saveRequest = id
		? await request(`/posts/${id}`, 'PATCH', newPostData)
		: await request(`/posts`, 'POST', newPostData)

	if (saveRequest) {
		dispatch(setPostData(saveRequest.data))
		return saveRequest.data
	}
}
