import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import classNames from 'classnames'

import { gameActions } from '../../state/actions'

import { Desktop, Mobile } from '../../../util/device'

import './WaitingRoom.css'

import { Alert } from '@material-ui/lab'
import {
	Collapse,
	Container,
	Grid,
	Box,
	Paper,
	withStyles,
	Typography,
	Card,
	CardContent,
	Button
} from '@material-ui/core'

const styles = (theme) => ({
	root: {
		flexGrow: 1
	},
	mainGrid: {
		height: '100vh'
	},
	title: {
		fontFamily: 'Poppins',
		marginTop: theme.spacing(7),
		fontSize: '2rem',
		fontWeight: 700,
		color: '#fff'
	},
	gameCode: {
		fontFamily: 'Poppins',
		fontWeight: 600
	},
	waitingText: {
		fontFamily: 'Poppins',
		marginTop: theme.spacing(2)
	},
	mainPaper: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		padding: theme.spacing(2),
		minWidth: '60%',
		backgroundColor: 'rgba(255,255,255,0.6)',
		backdropFilter: 'blur(4px)',
		borderRadius: '16px'
	},
	innerGrid: {
		padding: theme.spacing(1)
	},
	playersListGrid: {
		marginTop: theme.spacing(1),
		marginLeft: 0
	},
	nameTabCard: {
		border: '3px solid',
		borderRadius: '6px',
		display: 'flex',
		margin: theme.spacing(1),
		color: 'black',
		padding: theme.spacing(0),
		'& > *': {
			padding: theme.spacing(1),
			paddingBottom: 0,
			'&:last-child': {
				paddingBottom: theme.spacing(0)
			}
		}
	},
	chipNumber: {
		color: 'white',
		borderRight: '2px solid black',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	chipNumberBusy: {
		backgroundColor: theme.palette.error.dark
	},
	chipNumberFree: {
		backgroundColor: theme.palette.success.main
	},
	cardContent: {
		padding: theme.spacing(0),
		paddingBottom: 0,
		'&:last-child': {
			paddingBottom: theme.spacing(0)
		}
	},
	formButton: {
		marginTop: theme.spacing(2),
		marginRight: theme.spacing(0.5),
		marginLeft: theme.spacing(0.5),
		fontWeight: 'bold',
		'&:focus': {
			outline: 'none'
		}
	},
	leaveButton: {
		marginTop: theme.spacing(2),
		marginRight: theme.spacing(0.5),
		marginLeft: theme.spacing(0.5),
		backgroundColor: theme.palette.error.main,
		color: '#fff',
		fontWeight: 'bold',
		'&:focus': {
			outline: 'none'
		},
		'&:hover': {
			backgroundColor: theme.palette.error.dark
		}
	}
})

const WaitingRoom = (props) => {
	const { classes } = props
	const [errorOpen, setErrorOpen] = React.useState(false)

	const startGame = () => {
		props.startGame(props.gameCode, props.playerData.id)
	}
	const leaveGame = () => {
		props.leaveGame(props.gameCode, props.playerData.id)
	}

	useEffect(() => {
		if (props.error !== null) setErrorOpen(true)
	}, [props.error])

	useEffect(() => {
		// Add component specific general tag classnames
		if (document.getElementsByClassName('game-canvas')[0])
			document
				.getElementsByTagName('canvas')[0]
				.classList.add('waiting-room-canvas')
		// Remove all component specifics on component unmount
		return () => {
			document
				.getElementsByClassName('game-canvas')[0]
				.classList.remove('waiting-room-canvas')
		}
	})

	return (
		<div className="waiting-room-modal">
			<Container component="main">
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					wrap="nowrap"
					className={classes.mainGrid}
				>
					<Grid item container justify="center" alignContent="center">
						<Typography
							variant="h2"
							component="h2"
							className={classes.title}
						>
							Waiting Room
						</Typography>
					</Grid>
					<Grid item container justify="center" alignContent="center">
						<Paper className={classes.mainPaper} elevation={6}>
							<Grid
								container
								direction="column"
								justify="center"
								alignItems="center"
								className={classes.innerGrid}
							>
								<Grid
									container
									item
									spacing={0}
									direction="column"
									alignItems="center"
									justify="center"
								>
									<Typography variant="h6" component="h6">
										CODE
									</Typography>
									<Typography
										variant="h5"
										component="h5"
										className={classes.gameCode}
									>
										{props.gameCode}
									</Typography>
								</Grid>
								<Grid
									container
									item
									spacing={0}
									direction="column"
									alignItems="center"
									justify="center"
								>
									<Collapse in={errorOpen}>
										<Alert severity="error">
											{props.error
												? props.error.message
												: ''}
										</Alert>
									</Collapse>
								</Grid>
								<Grid
									container
									item
									spacing={0}
									direction="column"
									alignItems="center"
									justify="center"
								>
									{props.playerData.position ===
									props.gameOwner ? (
										<Typography
											variant="h6"
											component="h6"
											className={classes.waitingText}
										>
											Start the game when you're ready
										</Typography>
									) : (
										<Typography
											variant="h6"
											component="h6"
											className={classes.waitingText}
										>
											Waiting for host to start game...
										</Typography>
									)}
								</Grid>
								<Grid
									container
									item
									className={classes.playersListGrid}
								>
									<Desktop>
										<Grid
											item
											xs={6}
											className={classes.nameTabGrid}
										>
											{props.players
												.filter(
													(player) =>
														player.position % 2 ===
														1
												)
												.map((player, index) => {
													return (
														<Card
															className={
																classes.nameTabCard
															}
															variant="outlined"
															key={index}
														>
															<Box
																className={classNames(
																	classes.chipNumber,
																	classes.chipNumberFree
																)}
															>
																{
																	player.position
																}
															</Box>
															<div
																className={
																	classes.detail
																}
															>
																<CardContent
																	className={
																		classes.cardContent
																	}
																>
																	<Typography
																		color={
																			'textSecondary'
																		}
																		component="div"
																		gutterBottom
																	>
																		{
																			player.name
																		}
																	</Typography>
																</CardContent>
															</div>
														</Card>
													)
												})}
										</Grid>
										<Grid
											item
											xs={6}
											className={classes.nameTabGrid}
										>
											{props.players
												.filter(
													(player) =>
														player.position % 2 ===
														0
												)
												.map((player, index) => {
													return (
														<Card
															className={
																classes.nameTabCard
															}
															variant="outlined"
															key={index}
														>
															<Box
																className={classNames(
																	classes.chipNumber,
																	classes.chipNumberBusy
																)}
															>
																{
																	player.position
																}
															</Box>
															<div
																className={
																	classes.detail
																}
															>
																<CardContent
																	className={
																		classes.cardContent
																	}
																>
																	<Typography
																		color={
																			// isActive
																			//     ? 'textPrimary'
																			// :
																			'textSecondary'
																		}
																		component="div"
																		gutterBottom
																	>
																		{
																			player.name
																		}
																	</Typography>
																</CardContent>
															</div>
														</Card>
													)
												})}
										</Grid>
									</Desktop>
									<Mobile>
										<Grid
											item
											xs={12}
											className={classes.nameTabGrid}
										>
											{props.players.map(
												(player, index) => {
													return (
														<Card
															className={
																classes.nameTabCard
															}
															variant="outlined"
															key={index}
														>
															<Box
																className={classNames(
																	classes.chipNumber,
																	player.position %
																		2 ===
																		1
																		? classes.chipNumberFree
																		: classes.chipNumberBusy
																)}
															>
																{
																	player.position
																}
															</Box>
															<div
																className={
																	classes.detail
																}
															>
																<CardContent
																	className={
																		classes.cardContent
																	}
																>
																	<Typography
																		color={
																			'textSecondary'
																		}
																		component="div"
																		gutterBottom
																	>
																		{
																			player.name
																		}
																	</Typography>
																</CardContent>
															</div>
														</Card>
													)
												}
											)}
										</Grid>
									</Mobile>
								</Grid>

								{props.playerData ? (
									<Grid
										container
										direction="row"
										justify="center"
									>
										{props.playerData.position ===
										props.gameOwner ? (
											<Button
												className={classes.formButton}
												size="small"
												variant="contained"
												color="primary"
												disabled={
													props.players.length <
													props.minPlayers
												}
												onClick={startGame}
											>
												Start Game
											</Button>
										) : (
											<> </>
										)}

										<Button
											className={classes.leaveButton}
											size="small"
											variant="contained"
											onClick={leaveGame}
										>
											Leave Game
										</Button>
									</Grid>
								) : null}
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}
WaitingRoom.propTypes = {
	players: PropTypes.array.isRequired,
	gameCode: PropTypes.string,
	gameOwner: PropTypes.number,
	playerData: PropTypes.object.isRequired,
	startGame: PropTypes.func.isRequired,
	leaveGame: PropTypes.func.isRequired,
	error: PropTypes.object
}
const mapDispatchToProps = (dispatch) => {
	return {
		startGame: (code, pid) =>
			dispatch(gameActions.startGameRequest(code, pid)),
		leaveGame: (code, pid) =>
			dispatch(gameActions.leaveGameRequest(code, pid))
	}
}
export default connect(
	null,
	mapDispatchToProps
)(withStyles(styles)(WaitingRoom))
