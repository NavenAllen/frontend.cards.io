import React, { useState, useEffect } from 'react'
import './AskCard.css'
import Hand from '../../../game-engine/components/Hand/Hand'
import { literatureSets } from '../../literatureSets'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { literatureGameActions } from '../../state/actions'

const AskCard = (props) => {
	const [cardSelected, setCardSelected] = useState(undefined)
	const [playerSelected, setPlayerSelected] = useState(undefined)
	const teams = [
		[1, 3, 5],
		[2, 4, 6]
	]
	useEffect(() => {
		findSetWithCard(props.card)
	})
	const findSetWithCard = (card) => {
		const set = literatureSets.find((set) => set.includes(card.num))
		return set.map((ele) => {
			return {
				num: ele,
				shape: card.shape
			}
		})
	}
	// getPlayerPosition=()=>{
	// 	return props.players.find(player=>)
	// }
	const askCard = (card) => {
		if (cardSelected == undefined || playerSelected == undefined) {
			alert('Select Card/Player to ask')
		} else {
			props.playAsk({
				card: card,
				code: props.gameCode,
				fid: props.playerId,
				tpos: playerSelected
			})
		}
	}
	const handleAskCardPlayerChange = (e) => {
		setPlayerSelected(e.target.value)
	}
	const askCardSelect = (card) => {
		setCardSelected(card)
	}
	return (
		<div className="ask-card-container">
			<div className="modal-main">
				<Hand
					cards={findSetWithCard(props.card)}
					inAskCard={true}
					askCardSelect={askCardSelect}
					style={{ left: 50, bottom: -50 }}
				/>
				{cardSelected != undefined ? (
					<div>
						<p>Card Selected:{cardSelected.num}</p>
						<select onChange={handleAskCardPlayerChange}>
							{props.playerPosition % 2
								? teams[0].map((pos) => {
										return (
											<option value={pos}>
												{/* {props.players[pos].name} */}
												{pos}
											</option>
										)
								  })
								: teams[1].map((pos) => {
										return (
											<option value={pos}>
												{/* {props.players[pos].name} */}
												{pos}
											</option>
										)
								  })}
						</select>
						<input
							type="button"
							value="Ask Card"
							onClick={askCard}
						/>
					</div>
				) : null}
			</div>
		</div>
	)
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
