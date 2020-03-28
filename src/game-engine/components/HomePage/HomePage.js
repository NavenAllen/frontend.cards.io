import React from 'react';
import './HomePage.css'
import PropTypes from 'prop-types';
import CreateGameForm from './CreateGameForm'
import JoinGameForm from './JoinGameForm'
import { connect } from 'react-redux';
import { createGameActions } from '../../../State/Actions'
import socket,{subscribeTocreateGame} from '../../../socket-api/socket-api'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: "create"
        }
        subscribeTocreateGame((msg)=>{
            alert(msg);
        })
    }

    switchToCreateGame = () => {
        this.setState({
            form: "create"
        })
    }
    switchToJoinGame = () => {
        this.setState({
            form: "join"
        })
    }
    render() {
        const { locked } = this.props
        return (
            <div className="create-game-wrapper">
                <div className="create-game-container">
                    {this.state.form == "create" ? (
                        <div>
                            <h2 className="active" onClick={this.switchToCreateGame}>Create Game</h2>
                            <h2 className="inactive underlineHover" onClick={this.switchToJoinGame}>Join Game</h2>
                        </div>
                    ) : (
                            <div>
                                <h2 className="inactive underlineHover" onClick={this.switchToCreateGame}>Create Game</h2>
                                <h2 className="active" onClick={this.switchToJoinGame}>Join Game</h2>
                            </div>
                        )}

                    {(this.state.form == "create") ? (
                        <CreateGameForm
                            createGame={this.handleCreateGameFormSubmit}
                            locked={locked}
                        />)
                        : (
                            <JoinGameForm></JoinGameForm>
                        )}
                </div>
            </div>
        )
    }
    handleCreateGameFormSubmit = (user) => {
        this.props.createGame(user);
    }
}
HomePage.propTypes = {
    createGame: PropTypes.func.isRequired,
    JoinGame: PropTypes.func.isRequired,
    locked: PropTypes.bool.isRequired
}
const mapStateToProps = state => {
    return {
        locked: state.locked
    }
}
const mapDispatchToProps = dispatch => ({
    createGame: (user) => dispatch(createGameActions.createGame(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);