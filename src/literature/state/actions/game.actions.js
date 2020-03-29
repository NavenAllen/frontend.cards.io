import socket from '../../../util/socket-client'

export const literatureGameConstants = {
	PLAY_ASK_REQUEST: 'PLAY_ASK_REQUEST',
	PLAY_ASK_SUCCESS: 'PLAY_ASK_SUCCESS',
	PLAY_ASK_FAILURE: 'PLAY_ASK_FAILURE'
}

export const literatureGameActions = {
	playAsk,
	playAskSuccess,
	playAskFailure
}

function playAsk(askDetails) {
	return (dispatch) => {
		dispatch({ type: literatureGameConstants.CREATE_GAME_REQUEST })

		socket.emit('play-ask', askDetails)
	}
}

function playAskSuccess() {
	return (dispatch) =>
		dispatch({ type: literatureGameConstants.CREATE_GAME_SUCCESS })
}

function playAskFailure(errorDetails) {
	return (dispatch) =>
		dispatch({
			type: literatureGameConstants.CREATE_GAME_FAILURE,
			errorDetails
		})
}
