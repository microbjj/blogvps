import PropTypes from 'prop-types'

export function SpecialPanel({ editButton, deleteButton }) {
	return (
		<div className="flex gap-x-2 items-center">
			<div className="flex items-center gap-x-2 text-[18px]">
				{editButton}
				{deleteButton}
			</div>
		</div>
	)
}

SpecialPanel.propTypes = {
	editButton: PropTypes.node.isRequired,
	deleteButton: PropTypes.node.isRequired,
}
