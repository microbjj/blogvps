import { ACTION_TYPE } from '@/actions'

const initPostState = {
	modal: {
		isOpen: false,
		text: '',
		commentId: null,
		postId: null,
	},
}

export const appReducer = (state = initPostState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_POST_DATA: {
			return { ...state, ...action.payload }
		}
		case ACTION_TYPE.OPEN_MODAL: {
			return {
				...state,
				modal: { ...state.modal, ...action.payload, isOpen: true },
			}
		}
		case ACTION_TYPE.CLOSE_MODAL: {
			return {
				...state,
				modal: initPostState,
			}
		}
		default:
			return state
	}
}
