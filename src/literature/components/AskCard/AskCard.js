import React from 'react'
import './AskCard.css'
import Hand from '../../../game-engine/components/Hand/Hand'
import { literatureSets } from '../../literatureSets'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { literatureGameActions } from '../../state/actions'

class AskCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			cardSelected: undefined,
			playerSelected: undefined
		}
		this.findSetWithCard(props.card)
	}
	teams = [
		[1, 3, 5],
		[2, 4, 6]
	]
	componentDidUpdate(prevProps) {
		this.findSetWithCard(this.props.card)
	}
	findSetWithCard = (card) => {
		const set = literatureSets.find((set) => set.includes(card.num))
		return set.map((ele) => {
			return {
				num: ele,
				shape: card.shape
			}
		})
	}
	// getPlayerPosition=()=>{
	// 	return this.props.players.find(player=>)
	// }
	askCard = (card) => {
		if (
			this.state.cardSelected == undefined ||
			this.state.playerSelected == undefined
		) {
			alert('Select Card/Player to ask')
		} else {
			this.props.playAsk({
				card: card,
				code: this.props.gameCode,
				fid: this.props.playerId,
				tpos: this.state.playerSelected
			})
		}
	}
	handleAskCardPlayerChange = (e) => {
		this.setState({
			playerSelected: e.target.value
		})
	}
	askCardSelect = (card) => {
		this.setState({
			cardSelected: card
		})
	}
	render() {
		return (
			<div className="ask-card-container">
				<div className="modal-main">
					<Hand
						cards={this.findSetWithCard(this.props.card)}
						inAskCard={true}
						askCardSelect={this.askCardSelect}
						style={{ left: 50, bottom: -50 }}
					/>
					{this.state.cardSelected != undefined ? (
						<div>
							<p>Card Selected:{this.state.cardSelected.num}</p>
							<select onChange={this.handleAskCardPlayerChange}>
								{this.props.playerPosition % 2
									? this.teams[0].map((pos) => {
											return (
												<option value={pos}>
													{/* {this.props.players[pos].name} */}
													{pos}
												</option>
											)
									  })
									: this.teams[1].map((pos) => {
											return (
												<option value={pos}>
													{/* {this.props.players[pos].name} */}
													{pos}
												</option>
											)
									  })}
							</select>
							<input
								type="button"
								value="Ask Card"
								onClick={this.askCard}
							/>
						</div>
					) : null}
				</div>
			</div>
		)
	}
}
AskCard.propTypes = {
	card: PropTypes.object,
	gameCode: PropTypes.string.isRequired,
	playAsk: PropTypes.func.isRequired,
	playerId: PropTypes.string.isRequired,
	playerPosition: PropTypes.number.isRequired,
	players: PropTypes.array.isRequired
}
const mapStateToProps = (state) => {
	return {
		card: state.cardSelected,
		gameCode: state.gameData.code,
		playerId: state.playerData.id,
		players: state.gameData.players,
		playerPosition: state.playerData.position
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		playAsk: (askDetails) =>
			dispatch(literatureGameActions.playAsk(askDetails))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AskCard)
