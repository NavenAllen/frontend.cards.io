import React from 'react'
import './WaitingRoom.css'
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
	waitingText: {
		fontFamily: 'Poppins',
		marginTop: theme.spacing(2)
	},
	mainPaper: {
		marginLeft: theme.spacing(7),
		marginRight: theme.spacing(7),
		marginTop: theme.spacing(2),
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
		margin: theme.spacing(0.8),
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
		paddingRight: theme.spacing(2),
		backgroundColor: theme.palette.error.dark
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
	}
})

const WaitingRoom = (props) => {
	const { classes } = props

	return (
		<div className="waiting-room-modal">
			{/* <div className='modal-main'> */}
			<Container component="main">
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					// justify="center"
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
					<Grid
						item
						container
						justify="center"
						alignContent="center"
						alignItems="stretch"
					>
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
									items
									className={classes.playersListGrid}
								>
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
											.map((player) => {
												// const isActive = position === player.position
												return (
													<Card
														className={
															// classNames(
															classes.nameTabCard
															// isActive ? classes.activeCard : ''
															// )
														}
														// alignItems="center"
														variant="outlined"
													>
														<Box
															className={
																// classNames(
																classes.chipNumber
																// isActive
																//     ? classes.chipNumberFree
																//     : classes.chipNumberBusy
																// )
															}
														>
															{player.position}
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
											.map((player) => {
												// const isActive = position === player.position
												return (
													<Card
														className={
															// classNames(
															classes.nameTabCard
															// isActive ? classes.activeCard : ''
															// )
														}
														// alignItems="center"
														variant="outlined"
													>
														<Box
															className={
																// classNames(
																classes.chipNumber
																// isActive
																//     ? classes.chipNumberFree
																//     : classes.chipNumberBusy
																// )
															}
														>
															{player.position}
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
								</Grid>
								{props.playerData != undefined ? (
									<Grid
										container
										direction="row"
										justify="center"
										// alignItems="flex-end"
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
												onClick={props.startGame}
											>
												Start Game
											</Button>
										) : null}
									</Grid>
								) : null}
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Container>
			{/* </div> */}
		</div>
	)
}
export default withStyles(styles)(WaitingRoom)
