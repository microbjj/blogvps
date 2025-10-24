import { Input } from '@/components'
import PropTypes from 'prop-types'

export function Search({ onChange, search, onClear }) {
	return (
		<div className="mb-6 mx-auto flex items-center">
			<Input
				value={search}
				onChange={onChange}
				className="w-[340px] -mr-6 text-sm pr-7"
				placeholder="Поиск"
			/>

			{search && (
				<i
					className="fa fa-times mr-5 cursor-pointer"
					aria-hidden="true"
					onClick={onClear}
				></i>
			)}
			<i className="fa fa-search" aria-hidden="true"></i>
		</div>
	)
}

Search.propTypes = {
	onChange: PropTypes.func.isRequired,
	search: PropTypes.string.isRequired,
	onClear: PropTypes.func.isRequired,
}
