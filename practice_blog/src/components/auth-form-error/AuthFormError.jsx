import PropTypes from 'prop-types'

export function AuthFormError({ children }) {
	return (
		<div className="w-full text-center bg-red-500 text-sm text-white py-1 px-2 rounded-md mb-1 ">
			{children}
		</div>
	)
}

AuthFormError.propTypes = {
	children: PropTypes.node.isRequired,
}
