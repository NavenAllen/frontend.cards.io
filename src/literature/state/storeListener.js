import { store as notificationsStore } from 'react-notifications-component'
import logParser from '../util/logParser'

let currentState = []
let currentNotificationId

const checkArrayIdentical = (a, b) => {
	if (!a || !b) return false
	var i = a.length
	if (i !== b.length) return false
	while (i--) {
		if (a[i] !== b[i]) return false
	}
	return true
}

const selectLogs = (state) => {
	return state.gameData.logs
}

const literatureHandleStateChange = (rootStore) => {
	let nextState = selectLogs(rootStore.getState())

	if (!checkArrayIdentical(nextState, currentState)) {
		currentState = nextState
		if (currentState && currentState.length) {
			let parsedLog = logParser(currentState[currentState.length - 1])
			if (currentNotificationId)
				notificationsStore.removeNotification(currentNotificationId)
			currentNotificationId = notificationsStore.addNotification({
				title: parsedLog.title,
				message: parsedLog.message,
				type: parsedLog.type,
				insert: 'top',
				container: 'top-right',
				animationIn: ['animated', 'fadeIn'],
				animationOut: ['animated', 'fadeOut'],
				dismiss: {
					showIcon: true,
					duration: 20000
				},
				dismissable: true
			})
		}
	}
}

export default literatureHandleStateChange
