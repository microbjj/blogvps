import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPostIsLoading, setPosts } from '@/actions'
import { selectPostIsLoading, selectPosts } from '@/selectors'
import { PAGINATION_LIMIT } from '@/constants'
import { debounce } from '@/pages/main/utils/debounce'
import { Loader } from '@/components'
import { Pagination, PostCard, Search } from '@/pages/main/components'
import { request } from '@/utils'

export function Main() {
	const dispatch = useDispatch()

	const [page, setPage] = useState(1)
	const [lastPage, setLastPage] = useState(1)
	const [search, setSearch] = useState('')

	const posts = useSelector(selectPosts)
	const isLoading = useSelector(selectPostIsLoading)

	const debounceFetch = useMemo(
		() =>
			debounce(async (search, page) => {
				dispatch(setPostIsLoading(true))
				try {
					const {
						data: { lastPage, posts },
					} = await request(
						`/posts?search=${search}&page=${page}&limit=${PAGINATION_LIMIT}`,
					)
					dispatch(setPosts(posts))
					setLastPage(lastPage)
				} catch (error) {
					console.log('Ошибка при загрузке постов:', error)
				}
			}, 500),
		[dispatch],
	)

	useEffect(() => {
		debounceFetch(search, page)
	}, [page, search, debounceFetch])

	const onSearch = ({ target }) => {
		setSearch(target.value)
	}

	const onClear = () => {
		setSearch('')
	}

	if (isLoading) {
		return <Loader />
	}

	return (
		<>
			<Search onChange={onSearch} search={search} onClear={onClear} />
			{posts.length ? (
				<div className="grid grid-cols-3 gap-6 mx-auto">
					{posts.map((post) => (
						<PostCard
							key={post.id}
							id={post.id}
							title={post.title}
							imageUrl={post.imageUrl}
							publishedAt={post.publishedAt}
							commentsCount={post.comments.length}
						/>
					))}
				</div>
			) : (
				<div className="mx-auto mt-10">По данному запросу статей не найдено.</div>
			)}

			{!isLoading && lastPage > 1 && (
				<Pagination page={page} setPage={setPage} lastPage={lastPage} />
			)}
		</>
	)
}
