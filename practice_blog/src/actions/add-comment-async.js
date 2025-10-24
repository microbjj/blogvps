import { setPostComment } from '@/actions/set-post-comment'
import { request } from '@/utils'

export const addCommentAsync = (postId, content) => async (dispatch) => {
	const comment = await request(`/posts/${postId}/comments`, 'POST', {
		content,
	})
	if (comment) {
		dispatch(setPostComment(comment.data))
	}
}
