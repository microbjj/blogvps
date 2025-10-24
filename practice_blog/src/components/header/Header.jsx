import { Logo } from './Logo.jsx'
import { Description } from './Description.jsx'
import { Controls } from './Controls.jsx'

export function Header() {
	return (
		<header className="h-30 container px-10 py-5 shadow-xl flex justify-between items-center fixed top-0 bg-white z-10 ">
			<Logo />
			<Description />
			<Controls />
		</header>
	)
}
