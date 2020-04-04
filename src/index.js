import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

import rootStore from './rootState/store'
import { setDispatch, openGameSocket } from './util/socket-client'

setDispatch(rootStore.dispatch)
if (
	localStorage.getItem('playerId') !== null &&
	localStorage.getItem('gameCode') !== null
)
	openGameSocket(localStorage.getItem('gameCode').split(':')[0])

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
