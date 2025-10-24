import { Button } from '@/components'
import PropTypes from 'prop-types'

export function Pagination({ page, setPage, lastPage }) {
	return (
		<div className="flex items-center gap-x-2 justify-center my-4">
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</Button>
			<div className="px-6 border py-1 bg-gray-200 select-none font-semibold">
				{page}
			</div>
			<Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</Button>
			<Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				В конец
			</Button>
		</div>
	)
}

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
	lastPage: PropTypes.number.isRequired,
}
