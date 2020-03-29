import socket from '../util/socket-client'
import { gameActions } from './state/actions'

var startCoreGameEventListeners = (dispatch) => {
	const { createGameSuccess,getPlayersListSuccess,joinGameSuccess } = gameActions
	socket.on('game-updates', (data) => {
		switch(data.type){
			case 'CREATE': {
				if (data.code === 200) {
					dispatch(createGameSuccess(data))
				}
			}
			case 'LIST':{
				if(data.code===200){
					dispatch(joinGameSuccess(data))
				}
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
