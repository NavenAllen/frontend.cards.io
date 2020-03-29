import {createGameConstants} from '../actions';

const initialState = {};

export function createGame(state = initialState, action) {
    switch (action.type) {
        case createGameConstants.CREATE_GAME_REQUEST:
            return {
                ...state,
                locked: true,
            };
        default:
            return state;
    }
}
