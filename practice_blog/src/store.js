import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { appReducer } from '@/reducers/app-reducer'
import { postReducer, postsReducer, userReducer, usersReducer } from '@/reducers'

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	users: usersReducer,
	post: postReducer,
	posts: postsReducer,
})

export const store = configureStore({ reducer: reducer })
