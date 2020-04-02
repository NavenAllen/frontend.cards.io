import React from 'react'

import classNames from 'classnames'

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
		margin: theme.spacing(0.8),
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
	centerChild: {
		textAlign: 'center'
	},
	joinListGrid: {
		marginTop: theme.spacing(1),
		marginLeft: 0
	},
	nameTabGrid: {},
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
	chipNumberFree: {
		color: 'white',
		backgroundColor: theme.palette.success.main,
		borderRight: '2px solid black',
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	chipNumberBusy: {
		backgroundColor: theme.palette.error.dark,
	},
	cardContent: {
		padding: theme.spacing(0),
		paddingBottom: 0,
		'&:last-child': {
			paddingBottom: theme.spacing(0)
		}
	},
	joinBtnContainer: {
		marginTop: theme.spacing(2)
	},
	cssLabel: {
		color: 'black',
		fontWeight: 500
	},
	cssOutlinedInput: {
		backgroundColor: 'rgba(255,255,255,1)',
		'&$inputFocused $notchedOutline': {
			borderWidth: '2px',
			borderColor: `${theme.palette.primary.dark} !important`
		}
	},
	cssFocused: {
		color: 'black !important',
		fontWeight: 500
	},
	inputFocused: {
		fontSize: '1rem',
		backgroundColor: 'rgba(255,255,255,0.6)'
	},
	notchedOutline: {
		borderWidth: '2px',
		borderColor: '#006db3 !important'
	},
	formButton: {
		fontWeight: 'bold',
		'&:focus': {
			outline: 'none'
		}
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
							label="kaunsa game?"
							variant="outlined"
							size="small"
							InputLabelProps={{
								classes: {
									root: classes.cssLabel,
									focused: classes.cssFocused
								}
							}}
							InputProps={{
								classes: {
									root: classes.cssOutlinedInput,
									focused: classes.inputFocused,
									notchedOutline: classes.notchedOutline
								},
								inputMode: 'text'
							}}
							className={classes.textField}
							value={gameCode}
							onChange={handleGameCodeInputChange}
						/>
					</Grid>
					<Grid item alignItems="center" xs={3} justify="center">
						<Button
							size="small"
							variant="contained"
							color="primary"
							className={classes.formButton}
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
					className={classes.centerChild}
				></Grid>
				<Grid
					container
					xs={12}
					xl={12}
					className={classes.joinListGrid}
					spacing={0}
				>
					{props.players.map((player) => {
						const isActive = position === player.position
						return (
						<Grid item xs={6} className={classes.nameTabGrid}>
							<Card
								className={classes.nameTabCard}
								// alignItems="center"
								variant="outlined"
								onClick={() =>
									handlePositionInputChange(player.position)
								}
								
							>
								<Box
									className={
										classNames(
											classes.chipNumberFree,
											player.name==='<Available>' 
												? '' : classes.chipNumberBusy,
										)
									}
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
						)}
					)}
					<Grid
						container
						xs={12}
						sm={12}
						xl={12}
						justify="center"
						className={classes.joinBtnContainer}
					>
						<Button
							className={classes.formButton}
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
