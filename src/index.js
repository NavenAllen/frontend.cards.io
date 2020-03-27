import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './State/Reducers'
import * as serviceWorker from './serviceWorker';

const preloadedState = {
    'gamestate': {
      'game': 'literature',
      'players': [],
      'hand':[],
      'pile': [],
      'turn':{}
    },
    'litgamestate':{
        'teams': []
    }
  };
const store = createStore(rootReducer,preloadedState)

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
