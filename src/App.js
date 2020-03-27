import React from 'react'
import './App.css';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import GamePage from './game-engine/components/GamePage/GamePage'
import HomePage from './game-engine/components/HomePage/HomePage'

const App = props => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/home' component={HomePage}/>
                <Route path='/game' component={GamePage}/>
                <Route path='/' render={()=> (
                    localStorage.getItem('playerId')!=null?(
                        <Redirect to='/game'/>
                    ):(
                        <Redirect to='/home'/>
                    )
                )}/>
            </Switch>
        </BrowserRouter>
    )
};

// import {Engine} from './game-engine/engine'
// let {deal, fold, game} = Engine({});
// (
//     <>
//     <button style={{
//         position: 'absolute',
//         left: '50vw',
//         top: '50vh'
//     }} onClick={fold}>Fold all</button>
//     <button style={{
//         position: 'absolute',
//         left: '50vw',
//         top: '60vh'
//     }} onClick={() => deal(4)}>Deal</button>
//     {game}
//     </>
// );

export default App;
