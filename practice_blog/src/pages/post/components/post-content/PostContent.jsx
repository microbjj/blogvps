import { SpecialPanel } from '@/pages/post/components/special-panel/SpecialPanel'
import { useNavigate } from 'react-router'
import { openModal } from '@/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '@/components'
import { checkAccess } from '@/utils'
import { PROP_TYPE, ROLE } from '@/constants'
import { selectUserRole } from '@/selectors'

export function PostContent({ post }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const userRole = useSelector(selectUserRole)

	const onEdit = () => navigate(`/post/${post.id}/edit`)

	const onCommentDelete = (postId) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				postId,
			}),
		)
	}

	if (!post.id) {
		return <Loader />
	}

	const isAdministrator = checkAccess([ROLE.ADMINISTRATOR], userRole)

	return (
		<div className="flex flex-col px-20 mb-6">
			<div className="mr-20">
				<img
					src={post.imageUrl}
					alt={post.title}
					className="w-md object-contain object-top float-left mr-8 mb-4"
				/>
				<div className="flex justify-between items-start mb-4 flex-col">
					<h2 className="text-xl font-bold mb-2">{post.title}</h2>
					<div className="flex gap-x-2 items-center w-full justify-between">
						<span className="text-sm text-gray-700 flex gap-x-1 items-center">
							<i className="fa fa-calendar-o" aria-hidden="true"></i>
							{new Date(post.publishedAt).toLocaleDateString('ru-RU')}
						</span>

						{isAdministrator && (
							<SpecialPanel
								editButton={
									<i
										className="fa fa-pencil-square-o cursor-pointer"
										onClick={onEdit}
										aria-hidden="true"
									></i>
								}
								deleteButton={
									<i
										onClick={() => onCommentDelete(post.id)}
										className="fa fa-trash-o cursor-pointer"
										aria-hidden="true"
									></i>
								}
							/>
						)}
					</div>
				</div>
				<p className="text-base">{post.content}</p>
			</div>
		</div>
	)
}

PostContent.propTypes = {
	post: PROP_TYPE.POST.isRequired,
}
