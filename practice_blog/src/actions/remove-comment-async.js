import { deletePostComment } from '@/actions/delete-post-comment'
import { request } from '@/utils'

export const removeCommentAsync = (postId, commentId) => async (dispatch) => {
	const res = await request(`/posts/${postId}/comments/${commentId}`, 'DELETE')
	if (res) {
		dispatch(deletePostComment(commentId))
	}
}
