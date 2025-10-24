import { ROLE } from '@/constants'
import { ACTION_TYPE } from '@/actions/index.js'

const initUserState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
}

export const userReducer = (state = initUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER: {
			return {
				...state,
				...action.payload,
			}
		}
		case ACTION_TYPE.LOGOUT: {
			return initUserState
		}
		default:
			return state
	}
}
