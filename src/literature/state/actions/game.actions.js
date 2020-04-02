import { socket } from '../../../util/socket-client'

export const literatureGameConstants = {
	PLAY_ASK_REQUEST: 'PLAY_ASK_REQUEST',
	PLAY_ASK_SUCCESS: 'PLAY_ASK_SUCCESS',
	PLAY_ASK_FAILURE: 'PLAY_ASK_FAILURE',

	PLAY_DECLARE_REQUEST: 'PLAY_DECLARE_REQUEST',
	PLAY_DECLARE_SUCCESS: 'PLAY_DECLARE_SUCCESS',
	PLAY_DECLARE_FAILURE: 'PLAY_DECLARE_FAILURE',

	PLAY_TRANSFER_REQUEST: 'PLAY_TRANSFER_REQUEST',
	PLAY_TRANSFER_SUCCESS: 'PLAY_TRANSFER_SUCCESS',
	PLAY_TRANSFER_FAILURE: 'PLAY_TRANSFER_FAILURE'
}

export const literatureGameActions = {
	playAsk,
	playAskSuccess,
	playAskFailure,
	playDeclare,
	playDeclareSuccess,
	playDeclareFailure,
	playTransfer,
	playTransferSuccess,
	playTransferFailure
}

function playAsk(askDetails) {
	return (dispatch) => {
		dispatch({ type: literatureGameConstants.PLAY_ASK_REQUEST })

		socket.emit('play-ask', askDetails)
	}
}

function playAskSuccess() {
	return (dispatch) =>
		dispatch({ type: literatureGameConstants.PLAY_ASK_SUCCESS })
}

function playAskFailure(errorDetails) {
	return (dispatch) =>
		dispatch({
			type: literatureGameConstants.PLAY_ASK_FAILURE,
			errorDetails
		})
}

function playDeclare(declareDetails) {
	return (dispatch) => {
		dispatch({ type: literatureGameConstants.PLAY_DECLARE_REQUEST })

		socket.emit('play-declare', declareDetails)
	}
}

function playDeclareSuccess() {
	return (dispatch) =>
		dispatch({ type: literatureGameConstants.PLAY_DECLARE_SUCCESS })
}

function playDeclareFailure(errorDetails) {
	return (dispatch) =>
		dispatch({
			type: literatureGameConstants.PLAY_DECLARE_FAILURE,
			errorDetails
		})
}

function playTransfer(transferDetails) {
	return (dispatch) => {
		dispatch({ type: literatureGameConstants.PLAY_TRANSFER_REQUEST })

		socket.emit('play-transfer', transferDetails)
	}
}

function playTransferSuccess() {
	return (dispatch) =>
		dispatch({ type: literatureGameConstants.PLAY_TRANSFER_SUCCESS })
}

function playTransferFailure(errorDetails) {
	return (dispatch) =>
		dispatch({
			type: literatureGameConstants.PLAY_TRANSFER_FAILURE,
			errorDetails
		})
}
