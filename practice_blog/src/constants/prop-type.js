import PropTypes from 'prop-types'

const ROLE = {
	ADMINISTRATOR: 0,
	MODERATOR: 1,
	READER: 2,
	GUEST: 3,
}

export const PROP_TYPE = {
	ROLE_ID: PropTypes.oneOf(Object.values(ROLE)),
	ROLE: PropTypes.shape({
		id: PropTypes.oneOf(Object.values(ROLE)),
		name: PropTypes.string.isRequired,
	}),
	ERROR: PropTypes.oneOfType([PropTypes.string, PropTypes.exact(null)]),
	POST: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		imageUrl: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired,
	}),
	COMMENT: PropTypes.shape({
		id: PropTypes.string.isRequired,
		author: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		publishedAt: PropTypes.string.isRequired,
		onCommentDelete: PropTypes.func.isRequired,
	}),
}
