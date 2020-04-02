import React from 'react'
import './App.css'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import GamePage from './game-engine/components/GamePage/GamePage'
import HomePage from './game-engine/components/HomePage/HomePage'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const App = (props) => {
	const theme = React.useMemo(() =>
		createMuiTheme({
			palette: {
				primary: {
					main: '#039be5'
				},
				secondary: {
					main: '#f9c12d'
				},
				text: {
					primary: '#000000',
					secondary: 'rgba(0, 0, 0, 0.85)'
				}
			},
			typography: {
				fontFamily: [
					'Poppins',
					'-apple-system',
					'BlinkMacSystemFont',
					'"Segoe UI"',
					'Roboto',
					'"Helvetica Neue"',
					'Arial',
					'sans-serif',
					'"Apple Color Emoji"',
					'"Segoe UI Emoji"',
					'"Segoe UI Symbol"'
				].join(',')
			}
		})
	)

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Switch>
					<Route path="/home" component={HomePage} />
					<Route path="/game" component={GamePage} />
					<Route
						path="/"
						render={() =>
							props.inGame || localStorage.getItem('playerId') ? (
								<Redirect to="/game" />
							) : (
								<Redirect to="/home" />
							)
						}
					/>
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	)
}
App.propTypes = {
	inGame: PropTypes.bool.isRequired
}
const mapStateToProps = (state) => {
	return {
		inGame: state.inGame
	}
}
export default connect(mapStateToProps, null)(App)
