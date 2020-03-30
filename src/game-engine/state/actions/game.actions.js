import socket from '../../../util/socket-client'

export const gameConstants = {
	GET_PLAYERS_LIST_REQUEST: 'GET_PLAYERS_LIST_REQUEST',
	GET_PLAYERS_LIST_SUCCESS: 'GET_PLAYERS_LIST_SUCCESS',
	GET_PLAYERS_LIST_FAILURE: 'GET_PLAYERS_LIST_FAILURE',

	CREATE_GAME_REQUEST: 'CREATE_GAME_REQUEST',
	CREATE_GAME_SUCCESS: 'CREATE_GAME_SUCCESS',
	CREATE_GAME_FAILURE: 'CREATE_GAME_FAILURE',

	PROBE_GAME_REQUEST: 'PROBE_GAME_REQUEST',
	PROBE_GAME_SUCCESS: 'PROBE_GAME_SUCCESS',
	PROBE_GAME_FAILURE: 'PROBE_GAME_FAILURE',

	JOIN_GAME_REQUEST: 'JOIN_GAME_REQUEST',
	JOIN_GAME_SUCCESS: 'JOIN_GAME_SUCCESS',
	JOIN_GAME_FAILURE: 'JOIN_GAME_FAILURE'
}

export const gameActions = {
	createGame,
	createGameSuccess,
	createGameFailure,
	getPlayersList,
	getPlayersListSuccess,
	getPlayersListFailure,
	joinGameRequest,
	joinGameSuccess
}
function getPlayersList(gameCode) {
	return (dispatch) => {
		dispatch({ type: gameConstants.GET_PLAYERS_LIST_REQUEST })

		socket.emit('probe', { code: gameCode })
	}
}

function getPlayersListSuccess(data) {
	console.log(data)
	return (dispatch) =>
		dispatch({ type: gameConstants.GET_PLAYERS_LIST_SUCCESS, data })
}

function getPlayersListFailure(data) {
	return (dispatch) =>
		dispatch({
			type: gameConstants.GET_PLAYERS_LIST_REQUEST,
			message: data.message
		})
}

function createGame(user) {
	return (dispatch) => {
		dispatch({ type: gameConstants.CREATE_GAME_REQUEST })

		socket.emit('create', {
			name: user.name,
			pid: user.pid ? user.pid : null
		})
	}
}

function createGameSuccess(data) {
	console.log(data)
	return (dispatch) =>
		dispatch({ type: gameConstants.CREATE_GAME_SUCCESS, data })
}

function createGameFailure(data) {
	return (dispatch) =>
		dispatch({
			type: gameConstants.CREATE_GAME_FAILURE,
			message: data.message
		})
}
function joinGameRequest(user) {
	socket.emit('join', {
		code: user.gameCode,
		name: user.name,
		position: user.position
	})
	return { type: gameConstants.JOIN_GAME_REQUEST, data: user.gameCode }
}
function joinGameSuccess(data) {
	console.log(data)
	return { type: gameConstants.JOIN_GAME_SUCCESS, data: data }
}
