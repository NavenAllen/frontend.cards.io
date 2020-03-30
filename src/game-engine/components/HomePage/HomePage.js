import React from 'react'
import './HomePage.css'
import PropTypes from 'prop-types'
import CreateGameForm from './CreateGameForm'
import JoinGameForm from './JoinGameForm'
import { connect } from 'react-redux'
import { gameActions } from '../../state/actions'

class HomePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			form: 'create'
		}
	}
	componentDidUpdate(prevProps) {
		if (this.props.inGame) {
			this.props.history.push('/game')
		}
	}

	switchToCreateGame = () => {
		this.setState({
			form: 'create'
		})
	}
	switchToJoinGame = () => {
		this.setState({
			form: 'join'
		})
	}
	render() {
		const { locked } = this.props
		return (
			<div className="create-game-wrapper">
				<div className="create-game-container">
					<div className="left">
						<h2 className="active">createGame</h2>
						<CreateGameForm
							createGame={this.handleCreateGameFormSubmit}
							locked={locked}
						/>
					</div>
					<div className="or">OR</div>
					<div className="right">
						<h2 className="active">Join Game</h2>
						<JoinGameForm
							joinGame={this.handleJoinGameFormSubmit}
							probeGameRequest={this.props.probeGameRequest}
							players={this.props.players}
						/>
					</div>
				</div>
			</div>
		)
	}
	handleCreateGameFormSubmit = (user) => {
		this.props.createGame(user)
	}
	handleJoinGameFormSubmit = (user) => {
		this.props.joinGame(user)
	}
}
HomePage.propTypes = {
	createGame: PropTypes.func.isRequired,
	JoinGame: PropTypes.func.isRequired,
	locked: PropTypes.bool.isRequired,
	probeGameRequest: PropTypes.func.isRequired,
	players: PropTypes.array,
	inGame: PropTypes.bool.isRequired
}
const mapStateToProps = (state) => {
	return {
		locked: state.locked,
		players: state.gameData.players,
		inGame: state.inGame
	}
}
const mapDispatchToProps = (dispatch) => ({
	createGame: (user) => dispatch(gameActions.createGame(user)),
	probeGameRequest: (gameCode) =>
		dispatch(gameActions.getPlayersList(gameCode)),
	joinGame: (user) => dispatch(gameActions.joinGameRequest(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
