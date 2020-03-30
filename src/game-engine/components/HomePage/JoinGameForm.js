import React from 'react'
import './HomePage.css'

class JoinGamePage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			position: 0,
			gameCode: ''
		}
	}
	handleNameInputChange = (e) => {
		this.setState({
			name: e.target.value
		})
	}
	handlePositionInputChange = (e) => {
		this.setState({
			position: parseInt(e.target.value)
		})
	}
	handleGameCodeInputChange = (e) => {
		this.setState({
			gameCode: e.target.value
		})
	}
	handleGameCodeSubmit = () => {
		this.props.probeGameRequest(this.state.gameCode)
	}
	joinGame = () => {
		if (
			this.state.position != 0 &&
			this.state.name != '' &&
			this.state.gameCode != ''
		)
			this.props.joinGame(this.state)
	}
	render() {
		return (
			<div className="homePageForm">
				<input
					name="gameCode"
					type="text"
					placeholder="Game Code"
					onChange={this.handleGameCodeInputChange}
				/>
				<input
					name="probeGame"
					type="button"
					value="Probe Game"
					onClick={this.handleGameCodeSubmit}
				/>
				{this.props.players != undefined
					? this.props.players.map((ele) => {
							if (ele.name != '<Available>')
								return <p>{ele.name}</p>
					  })
					: null}
				<input
					name="JoinName"
					type="text"
					placeholder="Name"
					onChange={this.handleNameInputChange}
				/>
				<select onChange={this.handlePositionInputChange}>
					<option value={0} selected>
						No Position Selected
					</option>
					{this.props.players != undefined
						? this.props.players.map((ele) => {
								if (ele.name === '<Available>')
									return (
										<option value={ele.position}>
											{ele.position}
										</option>
									)
						  })
						: null}
				</select>
				<input
					type="button"
					value="Join Game"
					onClick={this.joinGame}
				/>
			</div>
		)
	}
}
export default JoinGamePage
