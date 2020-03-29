import openSocket from 'socket.io-client'
var socket = openSocket('http://localhost:3000/literature')

export default socket
