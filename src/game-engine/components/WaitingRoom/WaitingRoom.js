import React from 'react'
import './WaitingRoom.css'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { gameActions } from '../../state/actions'
import { useMediaQuery } from 'react-responsive'
import {
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
		marginTop: theme.spacing(2),
		height: '100vh'
	},
	title: {
		fontFamily: 'Poppins',
		marginTop: theme.spacing(3),
		fontWeight: 700,
		color: '#fff'
	},
	gameCode: {
		fontFamily: 'Poppins',
		marginTop: theme.spacing(1),
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
		minHeight: '50vh',
		minWidth: '60%',
		backgroundColor: 'rgba(255,255,255,0.6)',
		backdropFilter: 'blur(4px)',
		borderRadius: '16px'
	},
	innerGrid: {
		minHeight: '50vh'
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
		fontWeight: 'bold',
		'&:focus': {
			outline: 'none'
		}
	},
	leaveButton: {
		marginTop: theme.spacing(2),
		backgroundColor: theme.palette.error.dark,
		color: '#fff',
		fontWeight: 'bold',
		'&:focus': {
			outline: 'none'
		}
	}
})

const WaitingRoom = (props) => {
	const { classes } = props
	const startGame = () => {
		props.startGame(props.gameCode, props.playerData.id)
	}
	const leaveGame = () => {
		props.leaveGame(props.gameCode, props.playerData.id)
	}
	const Mobile = ({ children }) => {
		const isMob1 = useMediaQuery({
			maxDeviceHeight: 619
		})
		let isMob2 = useMediaQuery({ maxDeviceWidth: 767 })
		isMob2 = useMediaQuery({ maxDeviceHeight: 1020 }) && isMob2

		return isMob1 || isMob2 ? children : null
	}

	const Desktop = ({ children }) => {
		const isMob1 = useMediaQuery({
			maxDeviceHeight: 619
		})
		let isMob2 = useMediaQuery({ maxDeviceWidth: 767 })
		isMob2 = useMediaQuery({ maxDeviceHeight: 1020 }) && isMob2

		return isMob1 || isMob2 ? null : children
	}

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
								justify="space-evenly"
								alignItems="stretch"
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
										Code:
									</Typography>
									<Typography
										variant="h4"
										component="h4"
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
									{props.playerData.position == 1 ? (
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
														player.position % 2 == 1
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
														player.position % 2 == 0
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
																		2 ==
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

								{props.playerData != undefined ? (
									<Grid
										container
										direction="row"
										justify="center"
									>
										{props.playerData.position == 1 ? (
											<Button
												className={classes.formButton}
												size="small"
												variant="contained"
												color="primary"
												disabled={
													props.players.length < 6
												}
												onClick={startGame}
											>
												Start Game
											</Button>
										) : (
											<Button
												className={classes.leaveButton}
												size="small"
												variant="contained"
												onClick={leaveGame}
											>
												Leave Game
											</Button>
										)}
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
	playerData: PropTypes.object.isRequired,
	startGame: PropTypes.func.isRequired,
	leaveGame: PropTypes.func.isRequired
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
