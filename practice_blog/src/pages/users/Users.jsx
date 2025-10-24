import { UserRow } from './components/UserRow'
import { useEffect, useState } from 'react'
import { PrivateContent, Error } from '@/components'
import { ROLE } from '@/constants/index.js'
import { Loader } from '@/components/loader/Loader'
import { checkAccess } from '@/utils'
import { useSelector } from 'react-redux'
import { selectUserRole } from '@/selectors'
import { request } from '@/utils'

export function Users() {
	const [roles, setRoles] = useState([])
	const [users, setUsers] = useState([])
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false)
	const [errorMessage, setErrorMessage] = useState(null)
	const userRole = useSelector(selectUserRole)

	useEffect(() => {
		if (!checkAccess([ROLE.ADMINISTRATOR], userRole)) {
			return
		}

		const fetchRoles = async () => {
			try {
				const [usersRes, rolesRes] = await Promise.all([
					request('/users'),
					request('/users/roles'),
				])

				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error)
					return <Error error={errorMessage} />
				}

				setUsers(usersRes.data)
				setRoles(rolesRes.data)
			} catch (error) {
				setErrorMessage('Ошибка при загрузке данных')
				console.error(error)
			}
		}
		void fetchRoles()
	}, [shouldUpdateUserList, userRole])

	const onUserDelete = async (userId) => {
		await request(`/users/${userId}`, 'DELETE')
		setShouldUpdateUserList(!shouldUpdateUserList)
	}
	if ((!users.length || !roles.length) && !userRole) {
		return <Loader />
	}

	return (
		<div className="flex flex-col self-center ">
			<PrivateContent access={[ROLE.ADMINISTRATOR]} serverError={errorMessage}>
				<h2 className="font-bold text-xl self-center mb-4">Пользователи</h2>
				<div className="w-xl">
					<div className="flex mb-2 px-4">
						<div className="w-43">Логин</div>
						<div className="w-53">Дата регистрации</div>
						<div>Роль</div>
					</div>
					<div className="flex flex-col gap-y-2">
						{users.map(({ id, login, registeredAt, roleId }) => (
							<UserRow
								key={id}
								login={login}
								registeredAt={registeredAt}
								roleId={roleId}
								roles={roles.filter((role) => role.id !== ROLE.GUEST)}
								id={id}
								onCurrentUserDelete={() => onUserDelete(id)}
							/>
						))}
					</div>
				</div>
			</PrivateContent>
		</div>
	)
}
