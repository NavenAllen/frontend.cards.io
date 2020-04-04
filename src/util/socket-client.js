import io from 'socket.io-client'
import startEventListeners from '../rootState/rootEventListener'

var socket
var dispatch

const setDispatch = (d) => {
	dispatch = d
}

const openGameSocket = (gameType) => {
	if (socket === undefined) {
		socket = io('http://localhost:3000/' + gameType, {
			query: {
				pid: localStorage.getItem('playerId')
					? localStorage.getItem('playerId')
					: ''
			}
		})
		startEventListeners(dispatch)
	}
}

export { socket, openGameSocket, setDispatch }
