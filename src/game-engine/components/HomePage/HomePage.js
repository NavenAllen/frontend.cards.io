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
					{/* {this.state.form === 'create' ? (
                        <div>
                            <h2 className="active" onClick={this.switchToCreateGame}>
                                Create Game
                            </h2>
                            <h2 className="inactive underlineHover" onClick={this.switchToJoinGame}>
                                Join Game
                            </h2>
                        </div>
                    ) : (
                            <div>
                                <h2 className="inactive underlineHover" onClick={this.switchToCreateGame}>
                                    Create Game
                            </h2>
                                <h2 className="active" onClick={this.switchToJoinGame}>
                                    Join Game
                            </h2>
                            </div>
                        )} */}

					{/* {this.state.form === 'create' ? (
                        <CreateGameForm createGame={this.handleCreateGameFormSubmit} locked={locked} />
                    ) : (
                        <JoinGameForm></JoinGameForm>
                    )} */}
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
						<JoinGameForm />
					</div>
				</div>
			</div>
		)
	}
	handleCreateGameFormSubmit = (user) => {
		this.props.createGame(user)
	}
}
HomePage.propTypes = {
	createGame: PropTypes.func.isRequired,
	JoinGame: PropTypes.func.isRequired,
	locked: PropTypes.bool.isRequired
}
const mapStateToProps = (state) => {
	return {
		locked: state.locked
	}
}
const mapDispatchToProps = (dispatch) => ({
	createGame: (user) => dispatch(gameActions.createGame(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
