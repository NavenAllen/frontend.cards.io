import startCoreGameEventListeners from '../game-engine/eventListener'
import startLiteratureGameEventListeners from '../literature/eventListener';

var startEventListeners = (dispatch) => {
    startCoreGameEventListeners(dispatch)
    startLiteratureGameEventListeners(dispatch)
}

export default startEventListeners