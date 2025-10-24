export const getLastPage = (links) => {
	if (!links) return 1

	// Разделяем по запятой
	const parts = links.split(',')

	// Ищем ту часть, где есть rel="last"
	const lastLink = parts.find((part) => part.includes('rel="last"'))

	if (!lastLink) return 1

	// Ищем номер страницы
	const match = lastLink.match(/_page=(\d+)/)

	if (!match) return 1

	return Number(match[1])
}
