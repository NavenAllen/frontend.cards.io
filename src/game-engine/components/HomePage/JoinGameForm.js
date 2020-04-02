import React, { useState } from 'react'
import './HomePage.css'

import { withStyles } from '@material-ui/core/styles'
import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	TextField,
	Typography
} from '@material-ui/core'

const styles = (theme) => ({
	root: {},
	flexGrow: {
		flexGrow: 1
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	card: {
		margin: theme.spacing(0.5),
		'& > *': {
			padding: theme.spacing(1),
			paddingBottom: 0,
			'&:last-child': {
				paddingBottom: theme.spacing(1)
			}
		},
		'&:hover': {
			cursor: 'pointer'
		}
	},
	chip: {
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5)
	},
	titleContainer: {
		textAlign: 'center',
		marginTop: theme.spacing(6)
	},
	title: {
		fontFamily: 'Pacifico',
		color: 'white'
	},
	paper: {
		boxShadow: theme.shadows[9]
	},
	centerChild: {
		textAlign: 'center'
	},
	mainContainer: {
		width: '100vw',
		height: '100vh'
	},
	mainGrid: {
		marginTop: theme.spacing(2)
	},
	mainPaper: {
		minWidth: '75vw',
		minHeight: '70vh',
		backgroundColor: theme.palette.secondary
	},
	paperGridContainer: {
		padding: theme.spacing(2)
	},
	nameBigContainer: {
		marginTop: theme.spacing(0.5),
		marginBottom: theme.spacing(0.5)
	},
	sectionGrid: {
		padding: theme.spacing(2)
	},
	itemGrid: {},
	joinListGrid: {
		marginTop: theme.spacing(1),
		marginLeft: 0
	},
	nameTabGrid: {},
	nameTabCard: {
		border: '3px solid',
		borderRadius: '6px',
		display: 'flex',
		padding: theme.spacing(0),
		'& > *': {
			padding: theme.spacing(1),
			paddingBottom: 0,
			'&:last-child': {
				paddingBottom: theme.spacing(0)
			}
		}
	},
	chipNumberBox: {
		color: 'white',
		backgroundColor: theme.palette.secondary.main,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	cardContent: {
		padding: theme.spacing(0),
		paddingBottom: 0,
		'&:last-child': {
			paddingBottom: theme.spacing(0)
		}
	},
	cover: {
		width: '20%'
	},
	details: {
		display: 'flex',
		flexDirection: 'column'
	},
	joinBtnContainer: {
		marginTop: theme.spacing(2)
	}
})

const JoinGameForm = (props) => {
	const [position, setPosition] = useState()
	const [gameCode, setGameCode] = useState('')

	const handlePositionInputChange = (position) => {
		let player = props.players.find(
			(player) => player.position === position
		)
		if (player.name === '<Available>') setPosition(position)
	}

	const handleGameCodeInputChange = (e) => {
		setGameCode(e.target.value)
	}

	const handleProbeGameSubmit = () => {
		if (gameCode !== '') props.probeGameRequest(gameCode)
	}
	const joinGame = () => {
		if (!isNaN(position) && gameCode !== '')
			props.joinGame(gameCode, position)
	}

	const { classes } = props

	return (
		<>
			<Grid container xs={12} xl={12} alignItems="center">
				<Grid item xs={2}></Grid>
				<Grid container item xs={7} justify="center">
					<TextField
						label="Game Code"
						variant="outlined"
						size="small"
						fullWidth
						color="secondary"
						className={classes.textField}
						value={gameCode}
						onChange={handleGameCodeInputChange}
					/>
				</Grid>
				<Grid item alignItems="center" xs={3} justify="center">
					<Button
						size="small"
						variant="contained"
						color="secondary"
						onClick={handleProbeGameSubmit}
					>
						Peek
					</Button>
				</Grid>
			</Grid>
			<Grid
				container
				xs={12}
				xl={12}
				className={classes.joinListGrid}
				spacing={2}
			>
				{props.players.map((player) => {
					const isActive = position === player.position
					return (
						<Grid item xs={6} className={classes.nameTabGrid}>
							<Card
								className={classes.nameTabCard}
								alignItems="center"
								variant="outlined"
								onClick={() =>
									handlePositionInputChange(player.position)
								}
							>
								<Box
									className={classes.chipNumberBox}
									style={{
										backgroundColor: isActive ? 'green' : ''
									}}
								>
									{player.position}
								</Box>
								<div className={classes.detail}>
									<CardContent
										className={classes.cardContent}
									>
										<Typography
											color={
												isActive
													? 'textPrimary'
													: 'textSecondary'
											}
											component="div"
											gutterBottom
										>
											{player.name}
										</Typography>
									</CardContent>
								</div>
							</Card>
						</Grid>
					)
				})}
				<Grid
					container
					xs={12}
					sm={12}
					xl={12}
					justify="center"
					className={classes.joinBtnContainer}
				>
					<Button
						size="small"
						variant="contained"
						color="secondary"
						onClick={joinGame}
					>
						Join
					</Button>
				</Grid>
			</Grid>
		</>
	)
}

export default withStyles(styles)(JoinGameForm)
