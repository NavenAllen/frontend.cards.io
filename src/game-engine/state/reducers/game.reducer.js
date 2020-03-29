import { gameConstants } from '../actions';

const initialState = {};

export function game(state = initialState, action) { 
  switch (action.type) {
    case gameConstants.CREATE_GAME_REQUEST:
      return {
        ...state,
        locked: true
      };
    case gameConstants.CREATE_GAME_SUCCESS:
      return {
        ...state,
        gameData: {
            code: action.data.gcode
        },
        playerData: {
            id: action.data.pid,
            name: action.data.pname
        },
        locked: false
      };
    case gameConstants.CREATE_GAME_FAILURE:
      return {
        ...state,
        error: {
            code: action.data.code,
            message: action.data.message
        },
        locked: false
      };
    case gameConstants.GET_PLAYERS_LIST_REQUEST: 
      return {
        ...state,
        locked: true
      }
    case gameConstants.GET_PLAYERS_LIST_SUCCESS: 
      return {
          ...state,
          gameData: {
              ...state.gameData,
              players: action.data
          },
          locked: false
      }
    case gameConstants.GET_PLAYERS_LIST_FAILURE: {
        return {
            ...state,
            error: {
                code: action.data.code,
                message: action.data.message
            },
            locked: false
        }
    }
    default:
      return state;
  }
}