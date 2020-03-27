import React from 'react';
import './HomePage.css'
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: "create"
        }
        this.switchToJoinGame = this.switchToJoinGame.bind(this)
        this.switchToCreateGame = this.switchToCreateGame.bind(this)
    }
    switchToCreateGame() {
        this.setState({
            form: "create"
        })
    }
    switchToJoinGame() {
        this.setState({
            form: "join"
        })
    }
    render() {
        return (
            <div className="create-game-wrapper">
                <div className="create-game-container">
                    {this.state.form == "create" ? (
                        <div>
                            <h2 class="active" onClick={this.switchToCreateGame}>Create Game</h2>
                            <h2 class="inactive underlineHover" onClick={this.switchToJoinGame}>Join Game</h2>
                        </div>
                    ) : (
                            <div>
                                <h2 class="inactive underlineHover" onClick={this.switchToCreateGame}>Create Game</h2>
                                <h2 class="active" onClick={this.switchToJoinGame}>Join Game</h2>
                            </div>
                        )}

                    {(this.state.form == "create") ? (
                        <div>
                            <p>Create Game</p>
                            <input name="name" type='text' placeholder="Name" />
                            <input name="position" type='number' placeholder="position" />
                            <input type="button" value="create game" />
                        </div>) : (
                            <div>
                                
                            </div>
                        )}
                </div>
            </div>
        )
    }
}
export default HomePage