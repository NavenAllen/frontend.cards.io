import io from 'socket.io-client'
import startEventListeners from '../rootState/rootEventListener'

var socket
var dispatch

const setDispatch = (d) => {
	dispatch = d
}

const openGameSocket = (gameType) => {
	if (socket === undefined) {
		socket = io('https://cards.siliconcupcake.me/' + gameType, {
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
