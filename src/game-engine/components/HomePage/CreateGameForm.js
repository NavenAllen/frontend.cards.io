import React from 'react';
import './HomePage.css'

class CreateGameForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name:"",
            position:0
        }
    }
    handleNameInputChange=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    handlePositionInputChange=(e)=>{
        this.setState({
            position:e.target.value
        })
    }
    CreateGame=()=>{
        console.log(this.state)
    }
    render() {
        return (
            <div>
                <input name="name" type='text' placeholder="Name" onChange={this.handleNameInputChange} />
                <input name="position" type='number' placeholder="position" onChange={this.handlePositionInputChange} />
                <input type="button" value="create game" onClick={this.CreateGame}/>
            </div>
        )
    }
}
export default CreateGameForm

