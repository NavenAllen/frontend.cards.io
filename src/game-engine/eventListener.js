import socket from '../util/socket-client'
import { gameActions } from './state/actions'

var startCoreGameEventListeners = (dispatch) => {
	const { createGameSuccess,getPlayersListSuccess } = gameActions
	socket.on('game-updates', (data) => {
		if (data.type === 'CREATE') {
			if (data.code === 200) {
				dispatch(createGameSuccess(data))
			}
		}
	})
	socket.on('game-probe',(data)=>{
		if(data.code==200){
			dispatch(getPlayersListSuccess(data))
		}
	})
}

export default startCoreGameEventListeners;
