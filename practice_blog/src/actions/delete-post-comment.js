import { ACTION_TYPE } from '@/actions'

export const deletePostComment = (commentId) => ({
	type: ACTION_TYPE.DELETE_COMMENT,
	payload: commentId,
})
