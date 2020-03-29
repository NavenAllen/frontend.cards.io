import React from 'react'
import './App.css'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import GamePage from './game-engine/components/GamePage/GamePage'
import HomePage from './game-engine/components/HomePage/HomePage'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const App = (props) => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/home" component={HomePage} />
				<Route path="/game" component={GamePage} />
				<Route
					path="/"
					render={() =>
						props.inGame ? (
							<Redirect to="/game" />
						) : (
							<Redirect to="/home" />
						)
					}
				/>
			</Switch>
		</BrowserRouter>
	)
}
App.propTypes={
	inGame: PropTypes.bool.isRequired
}
const mapStateToProps=state=>{
	return {
		inGame: state.inGame
	}
}
export default connect(mapStateToProps,null)(App)
