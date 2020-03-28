import openSocket from 'socket.io-client';
var socket = openSocket('http://localhost:8000/literature');

export default socket;

export function subscribeTocreateGame(cb) {
    socket.on('gameUpdates', (msg) => {
        cb(msg);
    });
}
