import socket from '../util/socket-client'
import { literatureGameActions } from './state/actions'

var startLiteratureGameEventListeners = (dispatch) => {
	const {
		playAskSuccess,
		playAskFailure,
		playDeclareSuccess,
		playDeclareFailure,
		playTransferSuccess,
		playTransferFailure
	} = literatureGameActions

	socket.on('play-ask', (data) => {
		if (data.code === 200) dispatch(playAskSuccess())
		else dispatch(playAskFailure(data))
	})
	socket.on('play-declare', (data) => {
		if (data.code === 200) dispatch(playDeclareSuccess())
		else dispatch(playDeclareFailure(data))
	})
	socket.on('play-transfer', (data) => {
		if (data.code === 200) dispatch(playTransferSuccess())
		else dispatch(playTransferFailure(data))
	})
}

export default startLiteratureGameEventListeners
