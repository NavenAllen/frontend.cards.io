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
		fontFamily: 'Poppins',
		marginTop: theme.spacing(3),
		fontWeight: 700,
		color: theme.palette.text.primary
	},
	footer: {
		fontFamily: 'Poppins',
		marginTop: theme.spacing(4),
		fontWeight: 600,
		paddingLeft: theme.spacing(0.7),
		paddingRight: theme.spacing(0.7),
		borderRadius: '4px',
		backgroundColor: 'rgba(255,255,255,0.6)',
		backdropFilter: 'blur(4px)',
		color: theme.palette.text.primary
	},
	paper: {
		boxShadow: theme.shadows[9]
	},
	mainContainer: {},
	mainGrid: {
		marginTop: theme.spacing(2)
	},
	mainPaper: {
		marginTop: theme.spacing(2),
		borderRadius: '16px',
		//minHeight: "70vh",
		// backgroundColor: 'rgba(0,0,0,0.1)',
		backgroundColor: 'rgba(255,255,255,0.3)',
		backdropFilter: 'blur(4px)'
	},
	paperGridContainer: {
		padding: theme.spacing(2)
	},
	nameBigContainer: {
		marginTop: theme.spacing(0.5),
		marginBottom: theme.spacing(2)
	},
	sectionGrid: {
		padding: theme.spacing(1),
		alignContent: 'center'
	},
	nameInputContainer: {
		marginTop: theme.spacing(0.5)
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
		// color: `${theme.palette.primary.dark} !important`
		color: 'black !important',
		fontWeight: 500
	},
	inputFocused: {
		fontSize: '1rem',
		backgroundColor: 'rgba(255,255,255,0.6)'
	},
	notchedOutline: {
		borderWidth: '2px',
		borderColor: 'black !important'
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
					<Typography
						variant="h2"
						component="h2"
						className={classes.title}
					>
						cards.io
					</Typography>
					<Paper className={classes.mainPaper} elevation={6}>
						<Grid container className={classes.paperGridContainer}>
							<Grid
								container
								xs={12}
								sm={12}
								xl={12}
								justify="center"
								className={classes.joinBtnContainer}
							>
								<Grid item xs={2} sm={4} xl={4}></Grid>
								<Grid
									item
									container
									xs={8}
									sm={4}
									xl={4}
									justify="center"
									className={classes.nameInputContainer}
								>
									<TextField
										label="who art thou?"
										size="small"
										variant="outlined"
										className={classes.textField}
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
												notchedOutline:
													classes.notchedOutline
											},
											inputMode: 'text'
										}}
										color="primary"
										value={name}
										onChange={handleNameInputChange}
									/>
								</Grid>
								<Grid item xs={2} sm={4} xl={4}></Grid>
							</Grid>
							<Grid container xs={12}>
								<Grid
									container
									xs
									className={classes.sectionGrid}
								>
									<CreateGameForm
										createGame={
											this.handleCreateGameFormSubmit
										}
										locked={locked}
									/>
								</Grid>
								<Grid container justify="center" item xs={1}>
									<div class="split-layout__divider">
										<div class="split-layout__rule"></div>
										<div class="split-layout__label">
											OR
										</div>
										<div class="split-layout__rule"></div>
									</div>
								</Grid>
								<Grid
									container
									xs
									className={classes.sectionGrid}
								>
									<JoinGameForm
										joinGame={this.handleJoinGameFormSubmit}
										probeGameRequest={
											this.props.probeGameRequest
										}
										players={this.props.players}
									/>
								</Grid>
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
					</Paper>
					<Typography
						variant="h6"
						component="h6"
						className={classes.footer}
					>
						{'Made With \u2764 By Delta Force'}
					</Typography>
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
