import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../game-engine/state/reducers'

const preloadedState = {
	locked: false,
	gameData: {},
	playerData: {},
	error: null,
	inGame: false,
	isGameStarted: false
}
const rootStore = createStore(
	rootReducer,
	preloadedState,
	composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default rootStore
