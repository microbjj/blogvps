import { useLayoutEffect, useRef, useState } from 'react'
import { Input } from '@/components'
import { SpecialPanel } from '../special-panel/SpecialPanel'
import { sanitazeContent } from './utils/sanitaze-content'
import { useDispatch } from 'react-redux'
import { openModal, savePostAsync } from '@/actions'
import { useNavigate } from 'react-router'
import { PROP_TYPE } from '@/constants'

export function PostForm({ post }) {
	const [imageUrlValue, setImageUrlValue] = useState(post.imageUrl)
	const [titleValue, setTitleValue] = useState(post.title)

	const contentRef = useRef(null)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useLayoutEffect(() => {
		setImageUrlValue(post.imageUrl)
		setTitleValue(post.title)
	}, [post.title, post.imageUrl])

	const onSave = async () => {
		const newContent = sanitazeContent(contentRef.current.innerHTML)

		try {
			const data = await dispatch(
				savePostAsync(post.id, {
					imageUrl: imageUrlValue,
					title: titleValue,
					content: newContent,
				}),
			)
			navigate(`/post/${data.id}`)
		} catch (error) {
			console.log('savePostAsync error', error)
		} finally {
			setTitleValue('')
			setImageUrlValue('')
		}
	}

	const onCommentDelete = (postId) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				postId,
			}),
		)
	}

	const date = post.publishedAt ? post.publishedAt : new Date().toISOString()

	return (
		<div className="flex flex-col px-20 gap-y-4">
			<div className="flex justify-between">
				<span className="text-sm text-gray-700 flex gap-x-1 items-center">
					<i className="fa fa-calendar-o" aria-hidden="true"></i>
					{new Date(post.publishedAt).toLocaleDateString('ru-RU')}
				</span>
				<SpecialPanel
					publishedAt={date}
					editButton={
						<i
							onClick={onSave}
							className="fa fa-floppy-o cursor-pointer"
							aria-hidden="true"
						></i>
					}
					deleteButton={
						!post.publishedAt ? (
							''
						) : (
							<i
								onClick={() => onCommentDelete(post.id)}
								className="fa fa-trash-o cursor-pointer"
								aria-hidden="true"
							></i>
						)
					}
				/>
			</div>
			<div className="flex items-center gap-x-2">
				<Input
					placeholder="Ссылка на изображение"
					className="w-full"
					value={imageUrlValue}
					onChange={(e) => setImageUrlValue(e.target.value)}
				/>
				<Input
					placeholder="Название статьи"
					className="text-base font-bold w-full"
					value={titleValue}
					onChange={(e) => setTitleValue(e.target.value)}
				/>
			</div>

			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="text-base whitespace-pre-line border border-gray-500 py-1 px-2 rounded-md h-100 text-wrap"
			>
				{post.content}
			</div>
		</div>
	)
}

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
}
