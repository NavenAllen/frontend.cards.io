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

const joinGameData = [
	{ position: 1, name: 'Bharath' },
	{ position: 2, name: 'Bharath' },
	{ position: 3, name: 'Bharath' },
	{ position: 4, name: 'Bharath' },
	{ position: 5, name: 'Bharath' },
	{ position: 6, name: 'Bharath' }
]

const JoinGameForm = (props) => {
	const [name, setName] = useState('')
	const [position, setPosition] = useState(0)
	const [gameCode, setGameCode] = useState('')

	const handleNameInputChange = (e) => {
		setName(e.target.value)
	}

	const handlePositionInputChange = (e) => {
		setPosition(parseInt(e.target.value))
	}

	const handleGameCodeInputChange = (e) => {
		setGameCode(e.target.value)
	}

	const handleGameCodeSubmit = () => {
		props.probeGameRequest(gameCode)
	}
	const joinGame = () => {
		if (position !== 0 && name !== '' && gameCode !== '')
			props.joinGame({
				name: name,
				position: position,
				gameCode: gameCode
			})
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
					/>
				</Grid>
				<Grid item alignItems="center" xs={3} justify="center">
					<Button size="small" variant="contained" color="secondary">
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
				spacing={2}
			>
				{joinGameData.map((player) => (
					<Grid item xs={6} className={classes.nameTabGrid}>
						<Card
							className={classes.nameTabCard}
							alignItems="center"
							variant="outlined"
						>
							<Box className={classes.chipNumberBox}>
								{player.position}
							</Box>
							<div className={classes.detail}>
								<CardContent className={classes.cardContent}>
									<Typography
										color="textSecondary"
										component="div"
										gutterBottom
									>
										{player.name}
									</Typography>
								</CardContent>
							</div>
						</Card>
					</Grid>
				))}
				<Grid
					container
					xs={12}
					sm={12}
					xl={12}
					justify="center"
					className={classes.joinBtnContainer}
				>
					<Button size="small" variant="contained" color="secondary">
						Join
					</Button>
				</Grid>
			</Grid>
		</>
	)
}

export default withStyles(styles)(JoinGameForm)
