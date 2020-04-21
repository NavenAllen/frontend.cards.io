import React from 'react'
import classNames from 'classnames'

import {
	Container,
	Paper,
	Button,
	Grid,
	Card,
	Typography,
	Box,
	CardContent,
	withStyles
} from '@material-ui/core'

import { Desktop, Mobile } from '../../../util/device'

const styles = (theme) => ({
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
	winnersText: {
		fontFamily: 'Poppins',
		marginTop: theme.spacing(2),
		maxWidth: 500
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
	playersListGrid: {
		marginTop: theme.spacing(1),
		marginLeft: 0
	},
	innerGrid: {
		padding: theme.spacing(1)
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

const GameOverRoom = ({ open, players, handleClose, classes }) => {
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
							Tada! And it's over
						</Typography>
					</Grid>
					<Grid item container justify="center" alignContent="center">
						<Paper className={classes.mainPaper} elevation={6}>
							<Grid
								container
								item
								spacing={0}
								direction="column"
								alignItems="center"
								justify="center"
							>
								<Typography
									variant="h6"
									component="h6"
									className={classes.winnersText}
								>
									The following people now own bragging rights
									for being intellectuals..
								</Typography>
							</Grid>
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
									className={classes.playersListGrid}
								>
									<Desktop>
										<Grid
											item
											xs={6}
											className={classes.nameTabGrid}
										>
											{players
												.filter(
													(player, index) =>
														index % 2 === 0
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
											{players
												.filter(
													(player, index) =>
														index % 2 === 1
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
											{players.map((player, index) => {
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
									</Mobile>
								</Grid>
								<Grid
									container
									direction="row"
									justify="center"
								>
									<Button
										className={classes.leaveButton}
										size="small"
										variant="contained"
										onClick={handleClose}
									>
										Leave Game
									</Button>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default withStyles(styles)(GameOverRoom)
