import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../game-engine/state/reducers'
import literatureHandleStoreChange from '../literature/state/storeListener'

const preloadedState = {
	locked: false,
	gameData: {
		players: []
	},
	playerData: {
		hand: []
	},
	error: null,
	inGame: false,
	isGameStarted: false
}
const rootStore = createStore(
	rootReducer,
	preloadedState,
	composeWithDevTools(applyMiddleware(thunkMiddleware))
)

rootStore.subscribe(() => literatureHandleStoreChange(rootStore))

export default rootStore
