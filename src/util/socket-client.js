import io from 'socket.io-client'
var socket
if (localStorage.getItem('playerId') !== undefined) {
	socket = io('http://localhost:3000/literature', {
		query: { pid: localStorage.getItem('playerId') }
	})
} else {
	socket = io('http://localhost:3000/literature')
}

export default socket
