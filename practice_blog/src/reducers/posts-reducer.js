import { ACTION_TYPE } from '@/actions'

const initPostsState = {
	posts: [],
	isLoading: false,
}

export const postsReducer = (state = initPostsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.DELETE_POST: {
			return {
				...state,
				posts: state.posts.filter((post) => post.id !== action.payload.id),
			}
		}
		case ACTION_TYPE.SET_POSTS: {
			return {
				...state,
				posts: action.payload,
				isLoading: false,
			}
		}
		case ACTION_TYPE.SET_POST_IS_LOADING: {
			return {
				...state,
				isLoading: action.payload,
			}
		}
		default:
			return state
	}
}
