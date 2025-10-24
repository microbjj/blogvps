import { useEffect, useState } from 'react'

export function Footer() {
	const [weather, setWeather] = useState(null)
	const currentDate = new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })

	useEffect(() => {
		const accessKey = '1a4746f5-78c7-41cd-bed1-1842b3934a34'
		const headers = {
			'X-Yandex-Weather-Key': accessKey,
		}

		const getWeather = async () => {
			const reponse = await fetch(
				'https://api.weather.yandex.ru/v2/forecast?lat=55.0415&lon=82.9346',
				{ headers },
			)
			const weather = await reponse.json()
			setWeather(weather)
		}
		// TODO сделать новое апи погоды
		// getWeather()
	}, [])
	return (
		<div className="px-10 py-4 flex justify-between items-center text-base font-bold bg-white">
			<div className="flex flex-col gap-y-2">
				<div>Блог веб-разработчика</div>
				<div>web@developer.ru</div>
			</div>

			<div className="flex flex-col gy-2">
				<div>Новосибирск, {currentDate}</div>
				<div>{weather ? `111°C, влажность 111%` : 'Загрузка..'}</div>
			</div>
		</div>
	)
}
