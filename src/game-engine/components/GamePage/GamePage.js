import React from 'react'
import './GamePage.css'
import { Engine } from '../../engine'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AskCard from '../../../literature/components/AskCard/AskCard'
import WaitingRoom from '../WaitingRoom/WaitingRoom'
import { gameActions } from '../../state/actions'

const GamePage = (props) => {
	let { deal, fold, game } = Engine({})
	const startGame = (playerId) => {
		props.startGame(props.gameData.code, playerId)
	}
	return (
		<>
			{props.gameData.isActive != true ? (
				<WaitingRoom
					players={props.gameData.players}
					playerData={props.playerData}
					startGame={startGame}
				/>
			) : (
				<div>
					<h1>GameCode:{props.gameData.code}</h1>
					<button
						style={{
							position: 'absolute',
							left: '50vw',
							top: '50vh'
						}}
						onClick={fold}
					>
						Fold all
					</button>
					<button
						style={{
							position: 'absolute',
							left: '50vw',
							top: '60vh'
						}}
						onClick={() => deal(4)}
					>
						Deal
					</button>
					{game}
					{props.cardSelected != undefined ? <AskCard /> : null}
				</div>
			)}
		</>
	)
}
GamePage.propTypes = {
	gameData: PropTypes.object.isRequired,
	cardSelected: PropTypes.object,
	playerData: PropTypes.object,
	startGame: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
	return {
		gameData: state.gameData,
		cardSelected: state.cardSelected,
		playerData: state.playerData
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		startGame: (code, pid) =>
			dispatch(gameActions.startGameRequest(code, pid))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)
