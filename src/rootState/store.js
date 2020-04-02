import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../game-engine/state/reducers'

const preloadedState = {
	locked: false,
	gameData: {
		players: [
			{
				position: 1,
				name: 'Player1',
				count: 4
			},
			{
				position: 2,
				name: 'Player2',
				count: 3
			},
			{
				position: 3,
				name: 'Player3',
				count: 4
			},
			{
				position: 4,
				name: 'Player4',
				count: 4
			},
			{
				position: 5,
				name: 'Player5',
				count: 4
			},
			{
				position: 6,
				name: 'Player6',
				count: 4
			},
			{
				position: 7,
				name: 'Player7',
				count: 4
			},
			{
				position: 8,
				name: 'Player8',
				count: 4
			}
		]
	},
	playerData: {
		hand: ['2C', '6D', '3S', 'KS'],
		playerId: 1,
		position: 1
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

export default rootStore
