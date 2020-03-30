const edgeTopPositions = ['0.3em', '1.3em', '1.8em', '2.3em', '3.3em']
const centerTopPositions = ['0.3em', '0.8em', '1.8em', '2.8em', '3.3em']

export const suitePositions = {
	'1': [[], [centerTopPositions[2]], []],
	'2': [[], [centerTopPositions[0], centerTopPositions[4]], []],
	'3': [
		[],
		[centerTopPositions[0], centerTopPositions[2], centerTopPositions[4]],
		[]
	],
	'4': [
		[edgeTopPositions[0], edgeTopPositions[4]],
		[],
		[edgeTopPositions[0], edgeTopPositions[4]]
	],
	'5': [
		[edgeTopPositions[0], edgeTopPositions[4]],
		[centerTopPositions[2]],
		[edgeTopPositions[0], edgeTopPositions[4]]
	],
	'6': [
		[edgeTopPositions[0], edgeTopPositions[4]],
		[centerTopPositions[0], edgeTopPositions[4]],
		[edgeTopPositions[0], edgeTopPositions[4]]
	],
	'7': [
		[edgeTopPositions[0], edgeTopPositions[2], edgeTopPositions[4]],
		[centerTopPositions[1]],
		[edgeTopPositions[0], edgeTopPositions[2], edgeTopPositions[4]]
	],
	'8': [
		[edgeTopPositions[0], edgeTopPositions[2], edgeTopPositions[4]],
		[centerTopPositions[1], centerTopPositions[3]],
		[edgeTopPositions[0], edgeTopPositions[2], edgeTopPositions[4]]
	],
	'9': [
		[
			edgeTopPositions[0],
			edgeTopPositions[1],
			edgeTopPositions[3],
			edgeTopPositions[4]
		],
		[centerTopPositions[1]],
		[
			edgeTopPositions[0],
			edgeTopPositions[1],
			edgeTopPositions[3],
			edgeTopPositions[4]
		]
	],
	'10': [
		[
			edgeTopPositions[0],
			edgeTopPositions[1],
			edgeTopPositions[3],
			edgeTopPositions[4]
		],
		[centerTopPositions[1], centerTopPositions[3]],
		[
			edgeTopPositions[0],
			edgeTopPositions[1],
			edgeTopPositions[3],
			edgeTopPositions[4]
		]
	],
	J: [[], [centerTopPositions[2]], []],
	Q: [[], [centerTopPositions[2]], []],
	K: [[], [centerTopPositions[2]], []],
	A: [[], [centerTopPositions[2]], []]
}
