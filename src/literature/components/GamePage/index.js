import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { connect, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { gameActions } from '../../../game-engine/state/actions'

import { GameRenderer } from '../../../game-engine/renderer'
import { Engine } from '../../../game-engine/engine'
import GameView from '../../../game-engine/components/GameView/GameView'

import { Declare } from '../Declare'
//import AskCard from '../AskCard/AskCard'

import WaitingRoom from '../../../game-engine/components/WaitingRoom/WaitingRoom'
import LoaderModal from '../../../game-engine/components/LoaderModal/LoaderModal'
import DialogModal from '../../../game-engine/components/DialogModal/DialogModal'

import './GamePage.css'

import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'

// Initialize Renderer
let renderer = new GameRenderer()
renderer.initRenderer()
let startedLoad = false

const useStyles = makeStyles((theme) => ({
	appBar: {
		flexGrow: 1,
		backgroundColor: theme.palette.error.main
	},
	scoreContainer: {
		flexGrow: 1
	},
	playerScore: {
		marginRight: theme.spacing(0.8),
		'&:hover': {
			cursor: 'pointer'
		}
	},
	opponentScore: {
		marginLeft: theme.spacing(0.8),
		'&:hover': {
			cursor: 'pointer'
		}
	},
	title: {
		flexGrow: 1
	},
	leaveButton: {
		color: theme.palette.error.main
	}
}))

const GamePage = (props) => {
	const classes = useStyles()

	const [isAssetsLoaded, setIsAssetsLoaded] = useState(false)
	const [playerTeamScore, setPlayerTeamScore] = useState(0)
	const [opponentTeamScore, setOpponentTeamScore] = useState(0)
	const [playerTeamLogs, setPlayerTeamLogs] = useState([])
	const [opponentTeamLogs, setOpponentTeamLogs] = useState([])

	const loadGameView = () => {
		setIsAssetsLoaded(true)
	}

	// Load renderer assets
	if (!startedLoad) {
		renderer.loadRendererAssets(loadGameView)
		startedLoad = true
	}

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
	let { transferCard } = Engine({
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

	const handleClickRetry = () => {
		window.location.reload()
	}

	const handleClickLeave = () => {
		props.leaveGame(props.gameData.code, props.playerData.id)
	}

	const getPlayerPositionFromName = (players, name) => {
		return players.filter((player) => player.name === name)[0]
	}

	useEffect(() => {
		// Add renderer to game page
		document.body.appendChild(renderer.app.view)

		const updateScore = (gameData, playerData) => {
			let evenScore = 0
			let oddScore = 0

			gameData.players.forEach((player, index) => {
				if (player.position % 2 === 0) evenScore += player.score
				else oddScore += player.score
			})

			if (playerData.position % 2 === 0) {
				setPlayerTeamScore(evenScore)
				setOpponentTeamScore(oddScore)
			} else {
				setPlayerTeamScore(oddScore)
				setOpponentTeamScore(evenScore)
			}
		}

		const updateTeamLogs = (gameData, playerData) => {
			let evenTeamLogs = []
			let oddTeamLogs = []

			gameData.logs.forEach((log) => {
				let actionData = log.split(':')
				if (actionData[0] === 'DECLARE') {
					let position = getPlayerPositionFromName(
						gameData.players,
						actionData[1]
					)
					if (position % 2 === 0) evenTeamLogs.push(actionData[2])
					else oddTeamLogs.push(actionData[2])
				}
			})

			if (playerData.position % 2 === 0) {
				setPlayerTeamLogs(evenTeamLogs)
				setOpponentTeamLogs(oddTeamLogs)
			} else {
				setPlayerTeamLogs(oddTeamLogs)
				setOpponentTeamLogs(evenTeamLogs)
			}
		}

		if (props.error) setErrorOpen(true)
		updateScore(props.gameData, props.playerData)
		if (props.gameData.logs)
			updateTeamLogs(props.gameData, props.playerData)
	}, [props.error, props.gameData, props.playerData])

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
									gameOwner={props.gameData.owner}
									error={props.error}
									minPlayers={props.gameData.minPlayers}
									playerData={props.playerData}
								/>
							) : (
								<>
									<AppBar
										position="static"
										className={classes.appBar}
									>
										<Toolbar>
											<Typography
												className={
													classes.scoreContainer
												}
											>
												<Typography
													variant="inherit"
													className={
														classes.playerScore
													}
												>
													{playerTeamScore}
												</Typography>
												<Typography variant="inherit">
													:
												</Typography>
												<Typography
													variant="inherit"
													className={
														classes.opponentScore
													}
												>
													{opponentTeamScore}
												</Typography>
											</Typography>
											<Typography
												variant="h6"
												className={classes.title}
											>
												LITERATURE
											</Typography>
											<Button
												color="inherit"
												onClick={handleClickLeave}
											>
												Abandon Game
											</Button>
										</Toolbar>
									</AppBar>
									{isAssetsLoaded ? (
										<GameView
											renderer={renderer}
											others={otherPlayers}
											player={props.playerData}
											disabled
										/>
									) : (
										<LoaderModal show={true} />
									)}
									{open && (
										<Declare
											open={open}
											handleClose={handleClose}
										/>
									)}
									{/* {props.cardSelected !== undefined ? (
											<AskCard />
										) : null}
									 */}
								</>
							)}
						</div>
					) : (
						<>
							<LoaderModal show={!errorOpen} />
							<DialogModal
								open={errorOpen}
								title={'Uh-oh, something went wrong.'}
								content={props.error ? props.error.message : ''}
								actionButtons={[
									<Button
										key={0}
										color="primary"
										onClick={handleClickRetry}
									>
										Retry
									</Button>,
									<Button
										key={1}
										className={classes.leaveButton}
										onClick={handleClickLeave}
									>
										Leave
									</Button>
								]}
							/>
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

const mapDispatchToProps = (dispatch) => {
	return {
		leaveGame: (code, pid) =>
			dispatch(gameActions.leaveGameRequest(code, pid))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GamePage)
