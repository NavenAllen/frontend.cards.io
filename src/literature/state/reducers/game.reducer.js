import { literatureGameConstants } from '../actions'

const initialState = {}

export function game(state = initialState, action) {
	switch (action.type) {
		case literatureGameConstants.PLAY_ASK_REQUEST:
			return {
				...state,
				error: null,
				locked: true
			}
		case literatureGameConstants.PLAY_ASK_SUCCESS:
			return {
				...state,
				error: null,
				locked: false
			}
		case literatureGameConstants.PLAY_ASK_FAILURE:
			return {
				...state,
				error: {
					code: action.data.code,
					message: action.data.message
				},
				locked: false
			}
		case literatureGameConstants.PLAY_TRANSFER_REQUEST:
			return {
				...state,
				error: null,
				locked: true
			}
		case literatureGameConstants.PLAY_TRANSFER_SUCCESS:
			return {
				...state,
				error: null,
				locked: false
			}
		case literatureGameConstants.PLAY_TRANSFER_FAILURE:
			return {
				...state,
				error: {
					code: action.data.code,
					message: action.data.message
				},
				locked: false
			}
		case literatureGameConstants.PLAY_DECLARE_REQUEST:
			return {
				...state,
				error: null,
				locked: true
			}
		case literatureGameConstants.PLAY_DECLARE_SUCCESS:
			return {
				...state,
				error: null,
				locked: false
			}
		case literatureGameConstants.PLAY_DECLARE_FAILURE:
			return {
				...state,
				error: {
					code: action.data.code,
					message: action.data.message
				},
				locked: false
			}
		default:
			return state
	}
}
