import { Route, Routes } from 'react-router'
import { Auth, Main, Post, Register, Users } from './pages'
import { useLayoutEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '@/actions'
import { Footer, Header, Modal, Error } from '@/components'
import { ERROR } from '@/constants'

export function App() {
	const dispatch = useDispatch()
	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData')
		if (currentUserDataJSON) {
			const currentUserData = JSON.parse(currentUserDataJSON)
			dispatch(
				setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }),
			)
		}
	}, [dispatch])

	const Page = ({ children }) => (
		<div className="grow flex flex-col px-4 py-8 mt-30 bg-white">{children}</div>
	)

	return (
		<div className="flex flex-col h-screen container m-auto bg-white">
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Auth />} />
					<Route path="/register" element={<Register />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route path="*" element={<Error error={ERROR.PAGE_NOT_EXIST} />} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</div>
	)
}
