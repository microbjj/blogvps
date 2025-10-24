import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { SelectUserLogin, selectUserRole } from '@/selectors'
import { ROLE } from '@/constants'
import { logout } from '@/actions'
import { Button } from '@/components'
import { checkAccess } from '@/utils'

export function Controls() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const roleId = useSelector(selectUserRole)
	const login = useSelector(SelectUserLogin)

	const userLogout = () => {
		dispatch(logout())
		sessionStorage.removeItem('userData')
		navigate('login')
	}

	const isAdministrator = checkAccess([ROLE.ADMINISTRATOR], roleId)

	return (
		<div className="flex flex-col gap-y-2 w-[215px] items-end">
			{roleId === ROLE.GUEST ? (
				<Link to="/login">
					<Button>Войти</Button>
				</Link>
			) : (
				<div className="flex gap-x-3 items-center">
					<div className="font-bold">{login}</div>
					<button
						onClick={userLogout}
						className="text-xl cursor-pointer hover:text-blue-950"
					>
						<i className="fa fa-sign-out" aria-hidden="true"></i>
					</button>
				</div>
			)}

			<div className="flex gap-x-4">
				<button
					onClick={() => navigate(-1)}
					className="cursor-pointer hover:text-blue-950"
				>
					<i className="fa fa-backward" aria-hidden="true"></i>
				</button>
				{isAdministrator && (
					<>
						<Link to="/post" className="cursor-pointer hover:text-blue-950">
							<i className="fa fa-file-text-o" aria-hidden="true"></i>
						</Link>
						<Link to="/users" className="cursor-pointer hover:text-blue-950">
							<i className="fa fa-users" aria-hidden="true"></i>
						</Link>
					</>
				)}
			</div>
		</div>
	)
}
