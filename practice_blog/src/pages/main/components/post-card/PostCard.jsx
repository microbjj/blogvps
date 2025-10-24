import { Link } from 'react-router'
import PropTypes from 'prop-types'

export function PostCard({ id, title, commentsCount, publishedAt, imageUrl }) {
	const shortTitle = title.length > 28 ? title.slice(0, 26) + '..' : title
	const date = new Date(publishedAt).toLocaleDateString('RU')
	return (
		<Link to={`post/${id}`} className="flex flex-col w-70 h-55 border">
			<img
				src={imageUrl}
				alt={title}
				className="w-full object-cover overflow-hidden min-h-35 object-top"
			/>
			<div className="flex flex-col gap-y-1 px-4 py-2">
				<h3 className="font-semibold text-sm">{shortTitle}</h3>
				<div className="flex gap-x-2 items-center justify-between">
					<div className="flex gap-x-2 items-center ">
						<i className="fa fa-calendar-o" aria-hidden="true"></i>
						<div>{date}</div>
					</div>
					<div className="flex gap-x-1 items-center">
						<i className="fa fa-comment-o" aria-hidden="true"></i>
						<div>{commentsCount}</div>
					</div>
				</div>
			</div>
		</Link>
	)
}

PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
	publishedAt: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
}
