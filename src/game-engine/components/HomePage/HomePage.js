import React from 'react'
import './HomePage.css'
import PropTypes from 'prop-types'
import CreateGameForm from './CreateGameForm'
import JoinGameForm from './JoinGameForm'
import { connect } from 'react-redux'
import { gameActions } from '../../state/actions'

import { withStyles } from '@material-ui/core/styles';
import {
	Container,
	Grid,
	Paper,
	TextField,
	Typography
} from '@material-ui/core';

const styles = (theme) => ({
	root: {
	},
	flexGrow: {
		flexGrow: 1,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	card: {
		margin: theme.spacing(0.5),
		'& > *': {
			padding: theme.spacing(1),
			paddingBottom: 0,
			"&:last-child": {
				paddingBottom: theme.spacing(1)
			}
		},
		'&:hover': {
			cursor: 'pointer'
		},
	},
	chip: {
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5),
	},
	titleContainer: {
		textAlign: "center",
		marginTop: theme.spacing(1),
	},
	title: {
		fontFamily: 'Pacifico',
	},
	paper: {
		boxShadow: theme.shadows[9]
	},
	centerChild: {
		textAlign: "center"
	},
	mainContainer: {
	},
	mainGrid: {
		marginTop: theme.spacing(2)
	},
	mainPaper: {
		marginTop: theme.spacing(11),
		minHeight: "70vh",
		backgroundColor: "#fff",
	},
	paperGridContainer: {
		padding: theme.spacing(2),
	},
	nameBigContainer: {
		marginTop: theme.spacing(0.5),
		marginBottom: theme.spacing(4),
	},
	sectionGrid: {
		padding: theme.spacing(2),
	},
	itemGrid: {
	},
	joinListGrid: {
		marginTop: theme.spacing(1),
		marginLeft: 0
	},
	nameTabGrid: {
	},
	nameTabCard: {
		display: 'flex',
		padding: theme.spacing(0),
		'& > *': {
			padding: theme.spacing(1),
			paddingBottom: 0,
			"&:last-child": {
				paddingBottom: theme.spacing(0.5)
			}
		},
	},
	chipNumberBox: {
		color: "white",
		backgroundColor: theme.palette.secondary.main,
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2)
	},
	cardContent: {
		padding: theme.spacing(0),
		paddingBottom: 0,
		"&:last-child": {
			paddingBottom: theme.spacing(0)
		},
	},
	cover: {
		width: "20%",
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
	},
	joinBtnContainer: {
		marginTop: theme.spacing(2)
	}
});

class HomePage extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			form: 'create'
		}
	}
	componentDidUpdate(prevProps) {
		if (this.props.inGame) {
			this.props.history.push('/game')
		}
	}

	switchToCreateGame = () => {
		this.setState({
			form: 'create'
		})
	}
	switchToJoinGame = () => {
		this.setState({
			form: 'join'
		})
	}

	render() {
		const { classes, locked } = this.props;

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
					<Paper
						className={classes.mainPaper}
						elevation={6}
					>
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
							<Grid container xs={12} sm={12} xl={12}
								justify="center"
								className={classes.nameBigContainer}
							>
								<Grid item xs={2} sm={4} xl={4}></Grid>
								<Grid item xs={8} sm={4} xl={4}
									justify="center"
									className={classes.joinBtnContainer}
								>
									<TextField
										label="Enter your name"
										size="small"
										fullWidth
										variant="outlined"
										className={classes.textField}
										color="primary"
									/>
								</Grid>
								<Grid item xs={2} sm={4} xl={4}></Grid>
							</Grid>
							<Grid container xs={6} className={classes.sectionGrid} spacing={1}>
								<CreateGameForm
									createGame={this.handleCreateGameFormSubmit}
									locked={locked}
								/>
							</Grid>
							<Grid container xs={6} className={classes.sectionGrid}>
								<JoinGameForm
									joinGame={this.handleJoinGameFormSubmit}
									probeGameRequest={this.props.probeGameRequest}
									players={this.props.players}
								/>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Container>
		)
	}

	handleCreateGameFormSubmit = (user) => {
		this.props.createGame(user)
	}
	handleJoinGameFormSubmit = (user) => {
		this.props.joinGame(user)
	}
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomePage))
