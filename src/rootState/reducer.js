import reduceReducers from 'reduce-reducers';

import coreGameReducer from '../game-engine/state/reducers'
import literatureGameReducer from '../literature/state/reducers'

export default reduceReducers(coreGameReducer, literatureGameReducer);