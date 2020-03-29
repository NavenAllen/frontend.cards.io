import socket from '../util/socket-client'
import { literatureGameActions } from './state/actions'

var startLiteratureGameEventListeners = () => {
	const { playAskSuccess } = literatureGameActions
	socket.on('game-updates', (data) => {
		if (data.type === 'ASK') {
			if (data.code === 200) {
				playAskSuccess(data)
			}
		}
	})
}

export default startLiteratureGameEventListeners;
