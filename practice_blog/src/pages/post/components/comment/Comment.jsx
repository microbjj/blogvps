import { checkAccess } from '@/utils'
import { ROLE } from '@/constants'
import { useSelector } from 'react-redux'
import { selectUserRole } from '@/selectors'
import PropTypes from 'prop-types'

export const Comment = ({ id, author, content, publishedAt, onCommentDelete }) => {
	const userRole = useSelector(selectUserRole)
	const isAdministratorOrModerator = checkAccess(
		[ROLE.ADMINISTRATOR, ROLE.MODERATOR],
		userRole,
	)
	return (
		<div className="flex items-start gap-x-2">
			<div className="flex flex-col gap-y-1 w-[550px] border px-2 py-1">
				<div className="flex justify-between">
					<div className="flex items-center gap-x-1">
						<i className="fa fa-user-circle-o" aria-hidden="true"></i>
						{author}
					</div>

					<div>
						<i className="fa fa-calendar-o mr-2" aria-hidden="true"></i>
						{new Date(publishedAt).toLocaleString('RU')}
					</div>
				</div>
				<div>{content}</div>
			</div>
			{isAdministratorOrModerator && (
				<div className="text-[18px]">
					<i
						className="fa fa-trash-o mt-1 cursor-pointer"
						aria-hidden="true"
						onClick={() => onCommentDelete(id)}
					></i>
				</div>
			)}
		</div>
	)
}

Comment.propTypes = {
	id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	onCommentDelete: PropTypes.func.isRequired,
}
