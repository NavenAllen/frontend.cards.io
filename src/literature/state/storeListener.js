import { logParser, addNotification } from '../util'

let currentState = []

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
			let parsedLog = logParser(currentState[0])
			addNotification(parsedLog.title, parsedLog.message, parsedLog.type)
		}
	}
}

export default literatureHandleStateChange
