import PropTypes from 'prop-types'

export function Error({ error }) {
	return (
		error && (
			<div className="text-base self-center text-center mt-10">
				<div className="flex items-center justify-center gap-x-1">
					<i
						className="fa fa-exclamation-circle text-red-900"
						aria-hidden="true"
					></i>
					<h2>Ошибка</h2>
				</div>
				<h2>{error}</h2>
			</div>
		)
	)
}

Error.propTypes = {
	error: PropTypes.string,
}
