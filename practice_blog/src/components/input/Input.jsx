import clsx from 'clsx'

export function Input({ className, ...props }) {
	return (
		<input
			className={clsx('border border-gray-500 py-1 px-2 rounded-md', className)}
			{...props}
		/>
	)
}
