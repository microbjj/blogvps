import { ACTION_TYPE } from '@/actions/action-type'

export const setPostIsLoading = (value) => ({
	type: ACTION_TYPE.SET_POST_IS_LOADING,
	payload: value,
})
