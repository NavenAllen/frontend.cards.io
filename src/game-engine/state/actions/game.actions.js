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
	JOIN_GAME_FAILURE: 'JOIN_GAME_FAILURE',

	LEAVE_GAME_REQUEST: 'LEAVE_GAME_REQUEST',
	LEAVE_GAME_SUCCESS: 'LEAVE_GAME_SUCCESS',
	LEAVE_GAME_FAILURE: 'LEAVE_GAME_FAILURE',

	START_GAME_REQUEST: 'START_GAME_REQUEST',
	START_GAME_SUCCESS: 'START_GAME_SUCCESS',
	START_GAME_FAILURE: 'START_GAME_FAILURE',

	DESTROY_GAME_REQUEST: 'DESTROY_GAME_REQUEST',
	DESTROY_GAME_SUCCESS: 'DESTROY_GAME_SUCCESS',
	DESTROY_GAME_FAILURE: 'DESTROY_GAME_FAILURE',

	ADD_PLAYER: 'ADD_PLAYER',

	UPDATE_GAME: 'UPDATE_GAME',

	UPDATE_PLAYER: 'UPDATE_PLAYER'
}

export const gameActions = {
	createGame,
	createGameSuccess,
	createGameFailure,
	getPlayersList,
	getPlayersListSuccess,
	getPlayersListFailure,
	joinGameRequest,
	joinGameSuccess,
	joinGameFailure,
	leaveGameRequest,
	leaveGameSuccess,
	leaveGameFailure,
	startGameRequest,
	startGameSuccess,
	startGameFailure,
	destroyGameRequest,
	destroyGameSuccess,
	destroyGameFailure,
	addPlayer,
	updateGame,
	updatePlayer
}

function getPlayersList(gameCode) {
	return (dispatch) => {
		dispatch({ type: gameConstants.GET_PLAYERS_LIST_REQUEST })

		socket.emit('probe', { code: gameCode })
	}
}

function getPlayersListSuccess(data) {
	return (dispatch) =>
		dispatch({ type: gameConstants.GET_PLAYERS_LIST_SUCCESS, data })
}

function getPlayersListFailure(data) {
	return (dispatch) =>
		dispatch({
			type: gameConstants.GET_PLAYERS_LIST_REQUEST,
			data
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
			data
		})
}

function joinGameRequest(user) {
	return (dispatch) => {
		socket.emit('join', {
			code: user.gameCode,
			name: user.name,
			position: user.position
		})
		dispatch({ type: gameConstants.JOIN_GAME_REQUEST, data: user.gameCode })
	}
}

function joinGameSuccess(data) {
	return (dispatch) =>
		dispatch({ type: gameConstants.JOIN_GAME_SUCCESS, data })
}

function joinGameFailure(data) {
	return (dispatch) =>
		dispatch({ type: gameConstants.JOIN_GAME_FAILURE, data })
}

function leaveGameRequest(code, pid) {
	return (dispatch) => {
		socket.emit('leave', {
			code,
			pid
		})
		dispatch({ type: gameConstants.LEAVE_GAME_REQUEST })
	}
}

function leaveGameSuccess(data) {
	return (dispatch) =>
		dispatch({ type: gameConstants.LEAVE_GAME_SUCCESS, data })
}

function leaveGameFailure(data) {
	return (dispatch) =>
		dispatch({ type: gameConstants.LEAVE_GAME_FAILURE, data })
}

function startGameRequest(code, pid) {
	return (dispatch) => {
		socket.emit('start', {
			code,
			pid
		})
		dispatch({ type: gameConstants.START_GAME_REQUEST })
	}
}

function startGameSuccess(data) {
	return (dispatch) =>
		dispatch({ type: gameConstants.START_GAME_SUCCESS, data })
}

function startGameFailure(data) {
	return (dispatch) =>
		dispatch({ type: gameConstants.START_GAME_FAILURE, data })
}

function destroyGameRequest(code, pid) {
	return (dispatch) => {
		socket.emit('start', {
			code,
			pid
		})
		dispatch({ type: gameConstants.DESTROY_GAME_REQUEST })
	}
}

function destroyGameSuccess(data) {
	return (dispatch) =>
		dispatch({ type: gameConstants.DESTROY_GAME_SUCCESS, data })
}

function destroyGameFailure(data) {
	return (dispatch) =>
		dispatch({ type: gameConstants.DESTROY_GAME_FAILURE, data })
}

function addPlayer(name, position) {
	return (dispatch) =>
		dispatchEvent({ type: gameConstants.ADD_PLAYER({ name, position }) })
}

function updateGame(data) {
	return (dispatch) => dispatch({ type: gameConstants.UPDATE_GAME, data })
}

function updatePlayer(data) {
	return (dispatch) => dispatch({ type: gameConstants.UPDATE_PLAYER, data })
}
