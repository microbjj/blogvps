import { useState } from 'react'
import PropTypes from 'prop-types'
import { PROP_TYPE } from '@/constants'
import { request } from '@/utils'

export function UserRow({
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	id,
	onCurrentUserDelete,
}) {
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId)
	const [currentRole, setCurrentRole] = useState(userRoleId)

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value))
	}

	const onRoleSave = async (userId, newRoleId) => {
		const response = await request(`/users/${userId}`, 'PATCH', { roleId: newRoleId })

		if (response.error) {
			console.log(response.error)
			return
		}

		setCurrentRole(newRoleId)
	}

	const isSave = currentRole === selectedRoleId

	return (
		<div className="flex justify-between items-center gap-x-2 relative">
			<div className="flex justify-between w-full border px-4 py-1">
				<div>{login}</div>
				<div>{new Date(registeredAt).toLocaleString('ru-RU')}</div>
				<div>
					<select
						onChange={onRoleChange}
						className="border px-1 w-[150px]"
						value={selectedRoleId}
					>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<button
						disabled={isSave}
						className="px-2 cursor-pointer hover:text-blue-950 disabled:text-gray-400 disabled:hover:cursor-default"
						onClick={() => onRoleSave(id, selectedRoleId)}
					>
						<i className="fa fa-floppy-o" aria-hidden="true"></i>
					</button>
				</div>
			</div>
			<button
				className="px-1 py-1 hover:text-blue-950 cursor-pointer duration-100 absolute -right-7"
				onClick={onCurrentUserDelete}
			>
				<i className="fa fa-trash-o" aria-hidden="true"></i>
			</button>
		</div>
	)
}

UserRow.propTypes = {
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	id: PropTypes.string.isRequired,
	onCurrentUserDelete: PropTypes.func.isRequired,
}
