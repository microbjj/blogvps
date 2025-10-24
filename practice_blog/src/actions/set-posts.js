import { ACTION_TYPE } from '@/actions/action-type'

export const setPosts = (posts) => ({
	type: ACTION_TYPE.SET_POSTS,
	payload: posts,
})
