import React from 'react'
import './GamePage.css'
import { Engine } from '../../engine'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AskCard from '../../../literature/components/AskCard/AskCard'

const GamePage = (props) => {
	let { deal, fold, game } = Engine({})
	return (
		<>
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
			{props.cardSelected !== undefined ? <AskCard /> : null}
		</>
	)
}
GamePage.propTypes = {
	gameData: PropTypes.object.isRequired,
	cardSelected: PropTypes.object,
	playerData: PropTypes.object
}
const mapStateToProps = (state) => {
	return {
		gameData: state.gameData,
		cardSelected: state.cardSelected,
		playerData: state.playerData
	}
}

export default connect(mapStateToProps, null)(GamePage)
