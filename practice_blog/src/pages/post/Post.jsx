import { Comments, PostContent, PostForm } from '@/pages/post/components'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch, useParams } from 'react-router'
import { useEffect, useLayoutEffect, useState } from 'react'
import { loadPostAsync } from '@/actions'
import { selectPost } from '@/selectors/select-post'
import { RESET_POST_DATA } from '@/actions/reset-post-data'
import { Error, PrivateContent } from '@/components'
import { ROLE } from '@/constants'

export function Post() {
	const { id } = useParams()

	const [errorMessage, setErrorMessage] = useState('')

	const isEditing = useMatch('/post/:id/edit')
	const isCreating = useMatch('/post')
	const dispatch = useDispatch()
	const post = useSelector(selectPost)

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA)
	}, [])

	useEffect(() => {
		if (isCreating) {
			return
		}
		const response = async () => {
			const error = await dispatch(loadPostAsync(id))
			if (error) {
				setErrorMessage(error.message)
			}
		}
		void response()
	}, [id])

	if (errorMessage) {
		return <Error error={errorMessage} />
	}

	return isCreating || isEditing ? (
		<PrivateContent access={[ROLE.ADMINISTRATOR]}>
			<PostForm post={post} />
		</PrivateContent>
	) : (
		<>
			<PostContent post={post} />
			<Comments postId={post.id} />
		</>
	)
}
