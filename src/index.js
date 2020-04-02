import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

import rootStore from './rootState/store'
import { setDispatch, reconnectToGame } from './util/socket-client'

setDispatch(rootStore.dispatch)
if (
	localStorage.getItem('playerId') !== null &&
	localStorage.getItem('gameCode') !== null
)
	reconnectToGame(
		localStorage.getItem('gameCode').split(':')[0],
		localStorage.getItem('playerId')
	)

render(
	<Provider store={rootStore}>
		<App />
	</Provider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
