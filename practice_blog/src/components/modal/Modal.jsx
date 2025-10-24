import { Button } from '@/components'
import { useDispatch, useSelector } from 'react-redux'
import { selectModalCommentId, selectModalIsOpen, selectModalText } from '@/selectors'
import { closeModal, removeCommentAsync, removePostAsync } from '@/actions'
import { selectModalPostId } from '@/selectors/select-modal-post-id'
import { useNavigate } from 'react-router'

export function Modal() {
	const isOpen = useSelector(selectModalIsOpen)
	const navigate = useNavigate()
	const text = useSelector(selectModalText)
	const dispatch = useDispatch()
	const commentId = useSelector(selectModalCommentId)
	const postId = useSelector(selectModalPostId)

	if (!isOpen) {
		return null
	}

	const onCancel = () => {
		dispatch(closeModal)
	}

	const onConfirm = async () => {
		dispatch(closeModal)
		if (commentId && postId) {
			await dispatch(removeCommentAsync(postId, commentId))
			return
		}
		if (postId) {
			await dispatch(removePostAsync(postId))
			navigate('/')
		}
	}

	return (
		<div className="fixed z-100 top-0 left-0 right-0 bottom-0 bg-gray-500/70 backdrop-blur-xs flex flex-col items-center justify-center">
			<div className="flex flex-col items-center gap-y-4 w-90 border bg-white border-dark rounded-md min-h-30 justify-center">
				<h3 className="font-bold">{text}</h3>
				<div className="flex gap-x-2">
					<Button className="w-30" onClick={onConfirm}>
						Да
					</Button>
					<Button className="w-30" onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	)
}
