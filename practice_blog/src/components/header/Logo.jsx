import { Link } from 'react-router'

export function Logo() {
	return (
		<Link to="/" className="flex items-center gap-x-2">
			<div className="text-6xl mb-2">
				<i className="fa fa-code" aria-hidden="true"></i>
			</div>

			<div className="flex flex-col align-middle">
				<h1 className="text-4xl font-bold leading-7">Блог</h1>
				<div className="text-base font-bold">веб-разработчика</div>
			</div>
		</Link>
	)
}
