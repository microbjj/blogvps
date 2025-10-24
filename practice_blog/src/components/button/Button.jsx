import clsx from 'clsx'
import PropTypes from 'prop-types'

export function Button({ children, className, ...props }) {
	return (
		<button
			className={clsx(
				'border rounded-md px-4 py-1 bg-white  hover:bg-blue-900 hover:text-white duration-200 disabled:bg-gray-200 disabled:hover:text-black disabled:cursor-auto cursor-pointer',
				className,
			)}
			{...props}
		>
			{children}
		</button>
	)
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
}
