import { socket, openGameSocket } from '../../../util/socket-client'

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

	ADD_PLAYER: 'ADD_PLAYER',

	UPDATE_GAME: 'UPDATE_GAME',

	UPDATE_PLAYER: 'UPDATE_PLAYER',

	CARD_SELECTED: 'CARD_SELECTED',

	RECONNECT_SUCCESS: 'RECONNECT_SUCCESS',
	RECONNECT_FAILURE: 'RECONNECT_FAILURE',

	ADD_CARD: 'ADD_CARD'
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
	updateGame,
	updatePlayer,
	cardSelected,
	reconnectSuccess,
	reconnectFailure,
	addCard
}

function getPlayersList(gameCode) {
	return (dispatch) => {
		dispatch({ type: gameConstants.GET_PLAYERS_LIST_REQUEST })
		let type = gameCode.split(':')[0]
		openGameSocket(type)
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

		openGameSocket(user.gameType)
		socket.emit('create', {
			type: user.gameType,
			name: user.name,
			pid: user.pid ? user.pid : null
		})
	}
}

function createGameSuccess(data) {
	localStorage.setItem('playerId', data.pid)
	localStorage.setItem('gameCode', data.gcode)
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
		dispatch({ type: gameConstants.JOIN_GAME_REQUEST, data: user })
		let type = user.gameCode.split(':')[0]
		openGameSocket(type)
		socket.emit('join', {
			code: user.gameCode,
			name: user.name,
			position: user.position,
			pid: user.pid ? user.pid : null
		})
	}
}

function joinGameSuccess(data) {
	localStorage.setItem('playerId', data.pid)
	localStorage.setItem('gameCode', data.gcode)
	return (dispatch) =>
		dispatch({ type: gameConstants.JOIN_GAME_SUCCESS, data: data })
}

function joinGameFailure(data) {
	return (dispatch) =>
		dispatch({ type: gameConstants.JOIN_GAME_FAILURE, data })
}

function leaveGameRequest(code, pid) {
	return (dispatch) => {
		dispatch({ type: gameConstants.LEAVE_GAME_REQUEST })
		socket.emit('leave', {
			code,
			pid
		})
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
		localStorage.removeItem('gameCode')
		socket.emit('destroy', {
			code,
			pid
		})
	}
}

function updateGame(data) {
	return (dispatch) => dispatch({ type: gameConstants.UPDATE_GAME, data })
}

function updatePlayer(data) {
	return (dispatch) => dispatch({ type: gameConstants.UPDATE_PLAYER, data })
}

function cardSelected(card) {
	return (dispatch) =>
		dispatch({ type: gameConstants.CARD_SELECTED, data: card })
}

function reconnectSuccess(data) {
	return (dispatch) =>
		dispatch({ type: gameConstants.RECONNECT_SUCCESS, data: data })
}

function reconnectFailure(data) {
	return (dispatch) =>
		dispatch({ type: gameConstants.RECONNECT_FAILURE, data: data })
}

function addCard(card, fromPos, toPos) {
	return (dispatch) =>
		dispatch({
			type: gameConstants.ADD_CARD,
			data: { card, fromPos, toPos }
		})
}
