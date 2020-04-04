import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import './GamePage.css'
import { Engine } from '../../../game-engine/engine'
import { Declare } from '../Declare'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import WaitingRoom from '../../../game-engine/components/WaitingRoom/WaitingRoom'
import AskCard from '../AskCard/AskCard'
import LoaderModal from '../../../game-engine/components/LoaderModal/LoaderModal'
import { Collapse } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Redirect } from 'react-router-dom'

const GamePage = (props) => {
	const player = useSelector((state) => state.playerData)
	const otherPlayers = useSelector((state) =>
		state.gameData.players.filter(
			(item) => item.position !== player.position
		)
	)
	const onCardClick = (card) => {
		if (player.hand.indexOf(card) === -1) return
		let position = parseInt(prompt('Enter position'))
		transferCard(card, player.position, position, () => {
			// action to perform after animation and transfer
			console.log('here')
		})
	}
	let { game, transferCard } = Engine({
		playerCards: player.hand,
		otherPlayers,
		onCardClick,
		userPos: player.position
	})
	const [open, setOpen] = useState(false)
	const [errorOpen, setErrorOpen] = useState(false)
	const handleClose = () => {
		setOpen((prev) => !prev)
	}
	useEffect(() => {
		if (props.error) setErrorOpen(true)
	}, [props.error])
	return (
		<>
			{localStorage.getItem('gameCode') ? (
				<>
					{props.inGame ? (
						<div>
							{!props.gameData.isActive ? (
								<WaitingRoom
									players={props.gameData.players}
									gameCode={props.gameData.code}
									error={props.error}
									minPlayers={props.gameData.minPlayers}
									playerData={props.playerData}
								/>
							) : (
								<>
									{game}
									{open && (
										<Declare
											open={open}
											handleClose={handleClose}
										/>
									)}
									{props.cardSelected !== undefined ? (
										<AskCard />
									) : null}
								</>
							)}
						</div>
					) : (
						<>
							<Collapse in={errorOpen}>
								<Alert severity="error">
									{props.error ? props.error.message : ''}
								</Alert>
							</Collapse>
							<LoaderModal show={!errorOpen} />
						</>
					)}
				</>
			) : (
				<Redirect to="/home" />
			)}
		</>
	)
}
GamePage.propTypes = {
	gameData: PropTypes.object.isRequired,
	cardSelected: PropTypes.object,
	playerData: PropTypes.object,
	inGame: PropTypes.bool.isRequired,
	error: PropTypes.object
}
const mapStateToProps = (state) => {
	return {
		gameData: state.gameData,
		error: state.error,
		cardSelected: state.cardSelected,
		playerData: state.playerData,
		inGame: state.inGame
	}
}

export default connect(mapStateToProps, null)(GamePage)
