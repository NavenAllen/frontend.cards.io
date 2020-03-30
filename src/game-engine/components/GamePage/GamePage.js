import React from 'react'
import './GamePage.css'
import { Engine } from '../../engine'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
		</>
	)
}
GamePage.propTypes = {
	gameData: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
	return {
		gameData: state.gameData
	}
}

export default connect(mapStateToProps, null)(GamePage)
