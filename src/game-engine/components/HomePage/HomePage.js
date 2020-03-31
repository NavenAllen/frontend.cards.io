import React from 'react'
import './HomePage.css'
import PropTypes from 'prop-types'
import CreateGameForm from './CreateGameForm'
import JoinGameForm from './JoinGameForm'
import { connect } from 'react-redux'
import { gameActions } from '../../state/actions'

import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardHeader,
	CardMedia,
	Chip,
	Container,
	CssBaseline,
	Divider,
	Grid,
	IconButton,
	Paper,
	TextField,
	Typography
} from '@material-ui/core';

import {
	InfoOutlined as InfoIcon
} from '@material-ui/icons';

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
		},
	},
	chip: {
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5),
	},
	titleContainer: {
		textAlign: "center",
		marginTop: theme.spacing(6),
	},
	title: {
		fontFamily: 'Pacifico',
		color: "white",
	},
	paper: {
		boxShadow: theme.shadows[9]
	},
	centerChild: {
		textAlign: "center"
	},
	mainContainer: {
		width: "100vw",
		height: "100vh",
	},
	mainGrid: {
		marginTop: theme.spacing(2)
	},
	mainPaper: {
		minWidth: "75vw",
		minHeight: "70vh",
		backgroundColor: theme.palette.secondary,
	},
	paperGridContainer: {
		padding: theme.spacing(2),
	},
	nameBigContainer: {
		marginTop: theme.spacing(0.5),
		marginBottom: theme.spacing(0.5),
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

const createGameData = [
	{ name: 'Literature', tags: ['Team', '6 to 8'], rules: 'link' },
	{ name: 'Ace', tags: ['4 to 8'], rules: 'link' },
	{ name: 'Hearts', tags: ['Team', 'Only 4'], rules: 'link' },
	{ name: 'Bridge', tags: ['Team', '6 to 8'], rules: 'link' },
	{ name: 'Rummy', tags: ['4 to 6'], rules: 'link' }
]

const data2 = [
	{ position: 1, name: 'Bharath' },
	{ position: 2, name: 'Bharath' },
	{ position: 3, name: 'Bharath' },
	{ position: 4, name: 'Bharath' },
	{ position: 5, name: 'Bharath' },
	{ position: 6, name: 'Bharath' },
];

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

	handleCreateGameCardClick = (e) => {
		console.log("card",e);
	}

	handleCreateGameInfoClick = (e) => {
		// Stop click event propagation to parent(handleCreateGameCardClick)
		e.stopPropagation();
		console.log("info",e);
	}


	render() {
		const { classes, locked } = this.props;

		return (
			<Container component="main" className={classes.mainContainer}>
				<div className={classes.titleContainer}>
					<Typography
						variant="h3"
						component="h3"
						className={classes.title}
					>
						Cards.io
					</Typography>
				</div>
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
							<Grid container xs={12} sm={12} xl={12}
								justify="center"
								className={classes.nameBigContainer}
							>
								<Grid item xs={0} sm={4} xl={4}></Grid>
								<Grid item xs={12} sm={4} xl={4}
									justify="center"
									className={classes.joinBtnContainer}
								>
									<TextField
										label="Enter your name"
										size="small"
										fullWidth
										className={classes.textField}
										color="primary"
									/>
								</Grid>
								<Grid item xs={0} sm={4} xl={4}></Grid>
							</Grid>
							<Grid container xs={6} className={classes.sectionGrid} spacing={1}>
								{createGameData.map((game) => (
									<Grid item xl={4} sm={6} xs={12} className={classes.itemGrid}>
										<Card className={classes.card}
											onClick={this.handleCreateGameCardClick}
										>
											<CardHeader
												action={
													<div>
														<IconButton aria-label="settings"
															onClick={this.handleCreateGameInfoClick}
														>
															<InfoIcon />
														</IconButton>
													</div>
											}
												title="Literature"
											/>
											<CardContent>
												{game.tags.map((tag, i) => (
													<Chip
														key={i}
														className={classes.chip}
														size="small"
														label={tag}
													/>
												))}
											</CardContent>

										</Card>
									</Grid>
								))}
								<Grid container xs={12} sm={12} xl={12}
									justify="center"
									className={classes.joinBtnContainer}
								>
									<Button size="small" variant="contained" color="primary">
										Host
									</Button>
								</Grid>
							</Grid>
							<Grid container xs={6} className={classes.sectionGrid}>
								<Grid container xs={12} xl={12} alignItems="center" >
									<Grid container item xs={9} justify="center">
										<TextField
											label="Game Code"
											variant="outlined"
											size="small"
											fullWidth
											color="secondary"
											className={classes.textField}
										/>
									</Grid>
									<Grid item align="center" alignItems="center" xs={3} justify="center">
										<Button size="small" variant="contained" color="secondary">
											Peek
										</Button>
									</Grid>
								</Grid>
								<Grid container xs={12} xl={12} className={classes.centerChild}>
								</Grid>
								<Grid container xs={12} xl={12} className={classes.joinListGrid}
									spacing={2}
								>
									{data2.map((player) => (
										<Grid item xs={6} className={classes.nameTabGrid}>
											<Card className={classes.nameTabCard} alignItems="center">
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
									<Grid container xs={12} sm={12} xl={12}
										justify="center"
										className={classes.joinBtnContainer}
									>
										<Button size="small" variant="contained" color="secondary">
											Join
										</Button>
									</Grid>
								</Grid>
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
