import React from 'react'
import './HomePage.css'

class JoinGamePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name:"",
            position:0,
            gameCode:""
        }
    }
    handleNameInputChange=(e)=>{
        this.setState({
            name:e.target.value
        })
     //   console.log(this.state.name);
    }
    handlePositionInputChange=(e)=>{
        this.setState({
            position:e.target.value
        })
    }
    handleGameCodeInputChange=(e)=>{
        this.setState({
            gameCode:e.target.value
        })
        console.log(this.state.gameCode)
    }
    joinGame=()=>{
        console.log(this.state)
    }
    render() {
        return (
            <div>
                <input name="JoinName" type='text' placeholder="Name" onClick={this.handleNameInputChange} />
                <input name="JoinPosition" type='number' placeholder="position" onClick={this.handlePositionInputChange} />
                <input name="gameCode" type='text' placeholder="Game Code" onChange={this.handleGameCodeInputChange} />
                <input type="button" value="Join Game" onClick={this.joinGame} />   
            </div>
        )
    }
}
export default JoinGamePage