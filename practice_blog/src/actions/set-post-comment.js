import { ACTION_TYPE } from '@/actions/action-type'

export const setPostComment = (comment) => ({
	type: ACTION_TYPE.SET_POST_COMMENT,
	payload: comment,
})
