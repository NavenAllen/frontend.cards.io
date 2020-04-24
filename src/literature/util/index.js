import { store } from 'react-notifications-component'

const numberMap = {
	'2': 'Two',
	'3': 'Three',
	'4': 'Four',
	'5': 'Five',
	'6': 'Six',
	'7': 'Seven',
	'8': 'Eight',
	'9': 'Nine',
	'10': 'Ten',
	J: 'Jack',
	Q: 'Queen',
	K: 'King',
	A: 'Ace'
}
const suitMap = {
	D: 'Diamonds',
	H: 'Hearts',
	S: 'Spades',
	C: 'Clubs'
}

let notificationAudio = new Audio('sounds/notification.mp3')

const parseCard = (card) => {
	let parsedCard = ''
	if (card === 'JOKER') parsedCard = 'Joker'
	else {
		let number = card.slice(0, -1)
		let suit = card.slice(-1)
		parsedCard = numberMap[number] + ' of ' + suitMap[suit]
	}
	return parsedCard
}

const logParser = (log) => {
	let parsedLog = {
		title: '',
		message: '',
		type: ''
	}
	let splitLog = log.split(':')
	switch (splitLog[0]) {
		case 'CREATE':
			parsedLog.title = 'Game Create'
			parsedLog.message = splitLog[1] + ' created the game'
			parsedLog.type = 'info'
			break
		case 'JOIN':
			parsedLog.title = 'Player Joined'
			parsedLog.message = splitLog[1] + ' has joined the game!'
			parsedLog.type = 'info'
			break
		case 'START':
			parsedLog.title = 'Game Start'
			parsedLog.message = 'Game has started'
			parsedLog.type = 'info'
			break
		case 'ASK':
			parsedLog.title = 'Unsuccessful Ask'
			parsedLog.message =
				splitLog[1] +
				' asked ' +
				splitLog[2] +
				' the ' +
				parseCard(splitLog[3])
			parsedLog.type = 'danger'
			break
		case 'TAKE':
			parsedLog.title = 'Successful Ask'
			parsedLog.message =
				splitLog[1] +
				' took ' +
				parseCard(splitLog[3]) +
				' from ' +
				splitLog[2]
			parsedLog.type = 'success'
			break
		case 'TRANSFER':
			parsedLog.title = 'Turn Transfer'
			parsedLog.message =
				splitLog[1] + ' transferred turn to ' + splitLog[2]
			parsedLog.type = 'success'
			break
		case 'ATTEMPT':
			parsedLog.title = 'Declare Attempt'
			parsedLog.message =
				splitLog[1] + ' attempted to declare the ' + splitLog[2]
			parsedLog.type = 'info'
			break
		case 'DECLARE':
			parsedLog.title = 'Declare'
			parsedLog.message =
				splitLog[1] +
				' declared the ' +
				splitLog[2] +
				' ' +
				splitLog[3].toLowerCase() +
				'ly'
			if (splitLog[3] === 'CORRECT') parsedLog.type = 'success'
			else parsedLog.type = 'danger'
			break
		case 'LEAVE':
			parsedLog.title = 'Player left'
			parsedLog.message = splitLog[1] + ' has left the game!'
			parsedLog.type = 'info'
			break
		case 'WINNER':
			parsedLog.title = 'GameOver'
			parsedLog.message = splitLog[2]
			parsedLog.type = 'info'
			break
		default:
			break
	}
	return parsedLog
}

const addNotification = (title, message, type, mute) => {
	store.addNotification({
		title: title,
		message: message,
		type: type,
		insert: 'top',
		container: 'top-right',
		animationIn: ['animated', 'bounceIn'],
		animationOut: ['animated', 'bounceOut'],
		dismiss: {
			showIcon: true,
			duration: 10000,
			onScreen: true
		},
		dismissable: true
	})
	if (!mute) notificationAudio.play()
}

export { logParser, addNotification }
