import socket from '../util/socket-client'
import { gameActions } from './state/actions'

var startCoreGameEventListeners = (dispatch) => {
	const { createGameSuccess } = gameActions
	socket.on('game-updates', (data) => {
		if (data.type === 'CREATE') {
			if (data.code === 200) {
				createGameSuccess(data)
			}
		}
	})
}

export default startCoreGameEventListeners;
