import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPostComments, selectUserRole } from '@/selectors'
import { addCommentAsync, openModal } from '@/actions'
import { Comment } from '@/pages/post/components/comment'
import { ROLE } from '@/constants'
import PropTypes from 'prop-types'

export function Comments({ postId }) {
	const [newComment, setNewComment] = useState('')
	const dispatch = useDispatch()
	const comments = useSelector(selectPostComments)
	const userRole = useSelector(selectUserRole)

	const onNewCommentAdd = (postId, content) => {
		if (!content) {
			console.log('Комментарий не может быть пустым')
			return
		}
		dispatch(addCommentAsync(postId, content))
		setNewComment('')
	}

	const onCommentDelete = (commentId) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				postId,
				commentId,
			}),
		)
	}

	if (!postId) {
		return
	}
	const isGuest = userRole === ROLE.GUEST
	return (
		<div className="flex flex-col items-center w-full">
			{!isGuest && (
				<div className="flex gap-x-2 mb-3">
					<textarea
						name="comment"
						value={newComment}
						onChange={(event) => setNewComment(event.target.value)}
						placeholder="Комментарий..."
						className="border w-[550px] h-[120px] px-2 py-1 resize-none"
					></textarea>
					<i
						className="fa  mt-1 cursor-pointer fa-paper-plane-o"
						aria-hidden="true"
						onClick={() => onNewCommentAdd(postId, newComment)}
					></i>
				</div>
			)}
			<div className="text-base flex flex-col gap-y-3">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
						onCommentDelete={onCommentDelete}
					/>
				))}
			</div>
		</div>
	)
}

Comments.propTypes = {
	postId: PropTypes.string.isRequired,
}
