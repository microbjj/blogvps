import { setPostData } from '@/actions/set-post-data'
import { request } from '@/utils'

export const loadPostAsync = (postId) => async (dispatch) => {
	const { data, error } = await request(`/posts/${postId}`)

	if (error) {
		return await error
	}
	dispatch(setPostData(data))
}
