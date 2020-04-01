import React, { useEffect, useState } from 'react'
import './HomePage.css'
import PropTypes from 'prop-types'
import CreateGameForm from './CreateGameForm'
import JoinGameForm from './JoinGameForm'
import { connect } from 'react-redux'
import { gameActions } from '../../state/actions'

import { withStyles } from '@material-ui/core/styles'
import {
	Container,
	Grid,
	Paper,
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
	titleContainer: {
		textAlign: 'center',
		marginTop: theme.spacing(1)
	},
	title: {
		fontFamily: 'Pacifico'
	},
	paper: {
		boxShadow: theme.shadows[9]
	},
	mainContainer: {
	},
	mainContainer: {},
	mainGrid: {
		marginTop: theme.spacing(2)
	},
	mainPaper: {
		marginTop: theme.spacing(19),
		//minHeight: "70vh",
		backgroundColor: "#fff",
		//backgroundColor: "rgba(255,255,255,0.4)",
		//filter: "blur(4px)",
	},
	paperGridContainer: {
		padding: theme.spacing(2)
	},
	nameBigContainer: {
		marginTop: theme.spacing(0.5),
		marginBottom: theme.spacing(4)
	},
	sectionGrid: {
		padding: theme.spacing(2),
	},
	nameInputContainer: {
		marginTop: theme.spacing(2)
	}
})

const HomePage = (props) => {
	const [name, setName] = useState('')
	useEffect(() => {
		if (props.inGame) props.history.push('/game')
	})
	const handleCreateGameFormSubmit = (game) => {
		props.createGame({
			name,
			type: game
		})
	}
	const handleJoinGameFormSubmit = (gameCode, position) => {
		props.joinGame({
			gameCode,
			name,
			position
		})
	}
	const handleNameInputChange = (e) => {
		setName(e.target.value)
	}
	const { classes, locked } = props
	return (
		<Container component="main" className={classes.mainContainer}>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				className={classes.mainGrid}
			>
				<Paper className={classes.mainPaper} elevation={6}>
					<Grid container className={classes.paperGridContainer}>
						<Grid xs={12} className={classes.titleContainer}>
							<Typography
								variant="h3"
								component="h3"
								className={classes.title}
							>
								cards.io
							</Typography>
						</Grid>
						<Grid
							container
							xs={12}
							sm={12}
							xl={12}
							justify="center"
							className={classes.nameBigContainer}
						>
							<Grid item xs={2} sm={4} xl={4}></Grid>
							<Grid
								item
								xs={8}
								sm={4}
								xl={4}
								justify="center"
								className={classes.joinBtnContainer}
							>
								<Grid item xs={2} sm={4} xl={4}></Grid>
								<Grid item xs={8} sm={4} xl={4}
									justify="center"
									className={classes.nameInputContainer}
								>
									<TextField
										label="Enter your name"
										size="small"
										fullWidth
										variant="outlined"
										className={classes.textField}
										color="primary"
										value={name}
										onChange={handleNameInputChange}
									/>
								</Grid>
								<Grid item xs={2} sm={4} xl={4}></Grid>
							</Grid>
							<Grid container xs={12} sm={6} className={classes.sectionGrid} spacing={1}>
								<CreateGameForm
									createGame={this.handleCreateGameFormSubmit}
									locked={locked}
								/>
							</Grid>
							<Grid container xs={12} sm={6} className={classes.sectionGrid}>
								<JoinGameForm
									joinGame={this.handleJoinGameFormSubmit}
									probeGameRequest={this.props.probeGameRequest}
									players={this.props.players}
								/>
							</Grid>
							<Grid item xs={2} sm={4} xl={4}></Grid>
						</Grid>
						<Grid
							container
							xs={6}
							className={classes.sectionGrid}
							spacing={1}
						>
							<CreateGameForm
								createGame={handleCreateGameFormSubmit}
								locked={locked}
							/>
						</Grid>
						<Grid container xs={6} className={classes.sectionGrid}>
							<JoinGameForm
								joinGame={handleJoinGameFormSubmit}
								probeGameRequest={props.probeGameRequest}
								players={props.players}
							/>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Container>
	)
}

HomePage.propTypes = {
	createGame: PropTypes.func.isRequired,
	JoinGame: PropTypes.func.isRequired,
	locked: PropTypes.bool.isRequired,
	probeGameRequest: PropTypes.func.isRequired,
	players: PropTypes.array,
	inGame: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
	return {
		locked: state.locked,
		players: state.gameData.players,
		inGame: state.inGame
	}
}
const mapDispatchToProps = (dispatch) => ({
	createGame: (user) => dispatch(gameActions.createGame(user)),
	probeGameRequest: (gameCode) =>
		dispatch(gameActions.getPlayersList(gameCode)),
	joinGame: (user) => dispatch(gameActions.joinGameRequest(user))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(HomePage))
