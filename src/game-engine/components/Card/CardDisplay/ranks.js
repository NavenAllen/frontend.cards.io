const classNames = {
	topCenter: ['suit', 'top_center'],
	topLeft: ['suit', 'top_left'],
	topRight: ['suit', 'top_right'],
	middleCenter: ['suit', 'middle_center'],
	middleTop: ['suit', 'middle_top'],
	middleBottom: ['suit', 'middle_bottom'],
	middleLeft: ['suit', 'middle_left'],
	middleRight: ['suit', 'middle_right'],
	middleTopCenter: ['suit', 'middle_top_center'],
	middleTopLeft: ['suit', 'middle_top_left'],
	middleTopRight: ['suit', 'middle_top_right'],
	middleBottomLeft: ['suit', 'middle_bottom_left'],
	middleBottomRight: ['suit', 'middle_bottom_right'],
	middleBottomCenter: ['suit', 'middle_bottom_center'],
	bottomCenter: ['suit', 'bottom_center'],
	bottomLeft: ['suit', 'bottom_left'],
	bottomRight: ['suit', 'bottom_right']
}

export const suitPositions = {
	'2': [classNames.topCenter, classNames.bottomCenter],
	'3': [
		classNames.topCenter,
		classNames.middleCenter,
		classNames.bottomCenter
	],
	'4': [
		classNames.topLeft,
		classNames.topRight,
		classNames.bottomLeft,
		classNames.bottomRight
	],
	'5': [
		classNames.topLeft,
		classNames.topRight,
		classNames.middleCenter,
		classNames.bottomLeft,
		classNames.bottomRight
	],
	'6': [
		classNames.topLeft,
		classNames.topRight,
		classNames.middleLeft,
		classNames.middleRight,
		classNames.bottomLeft,
		classNames.bottomRight
	],
	'7': [
		classNames.topLeft,
		classNames.topRight,
		classNames.middleLeft,
		classNames.middleTop,
		classNames.middleRight,
		classNames.bottomLeft,
		classNames.bottomRight
	],
	'8': [
		classNames.topLeft,
		classNames.topRight,
		classNames.middleLeft,
		classNames.middleTop,
		classNames.middleBottom,
		classNames.middleRight,
		classNames.bottomLeft,
		classNames.bottomRight
	],
	'9': [
		classNames.topLeft,
		classNames.topRight,
		classNames.middleTopLeft,
		classNames.middleTopRight,
		classNames.middleCenter,
		classNames.middleBottomLeft,
		classNames.middleBottomRight,
		classNames.bottomLeft,
		classNames.bottomRight
	],
	'10': [
		classNames.topLeft,
		classNames.topRight,
		classNames.middleTopLeft,
		classNames.middleTopCenter,
		classNames.middleTopRight,
		classNames.middleBottomLeft,
		classNames.middleBottomCenter,
		classNames.middleBottomRight,
		classNames.middleRight,
		classNames.bottomLeft,
		classNames.bottomRight
	],
	A: [classNames.middleCenter]
}
