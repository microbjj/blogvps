export const sanitazeContent = (content) =>
	content
		.replaceAll('<div><br></div>', '\n')
		.replace(/' +'/, ' ')
		.replaceAll('<div>', '\n')
		.replaceAll('</div>', '')
		.replaceAll('&nbsp;', ' ')
