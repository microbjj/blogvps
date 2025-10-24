import { ACTION_TYPE } from '@/actions'

export const openModal = (params) => ({
	type: ACTION_TYPE.OPEN_MODAL,
	payload: params,
})
