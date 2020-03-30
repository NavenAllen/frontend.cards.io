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
			cardSelected: undefined
		}
		this.findSetWithCard(props.card)
	}
	teams = [
		[1, 3, 6],
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
	askCard = (card, player) => {
		this.props.playAsk({
			card: card,
			code: this.props.gameCode,
			fid: this.props.playerId,
			tpos: player
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
				<div>
					<Hand
						cards={this.findSetWithCard(this.props.card)}
						inAskCard={true}
						askCardSelect={this.askCardSelect}
						style={{ left: 0, bottom: -50 }}
					/>
				</div>
				{this.state.cardSelected != undefined ? (
					<div>
						Card Selected:{this.state.cardSelected.num}
						{/* <select onChange={}>
						{this.teams.includes}
					</select> */}
					</div>
				) : null}
			</div>
		)
	}
}
AskCard.propTypes = {
	card: PropTypes.object,
	gameCode: PropTypes.string.isRequired,
	playAsk: PropTypes.func.isRequired,
	playerId: PropTypes.string.isRequired,
	players: PropTypes.array.isRequired
}
const mapStateToProps = (state) => {
	return {
		card: state.cardSelected,
		gameCode: state.gameData.code,
		playerId: state.playerData.id,
		players: state.gameData.players
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		playAsk: (askDetails) =>
			dispatch(literatureGameActions.playAsk(askDetails))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AskCard)
