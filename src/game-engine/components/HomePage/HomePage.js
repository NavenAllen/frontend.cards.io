import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useMediaQuery } from 'react-responsive'

import CreateGameForm from './CreateGameForm'
import JoinGameForm from './JoinGameForm'
import { connect } from 'react-redux'
import { gameActions } from '../../state/actions'
import LoaderModal from '../LoaderModal/LoaderModal'

import './HomePage.css'

import { makeStyles } from '@material-ui/core/styles'
import { Alert } from '@material-ui/lab'
import {
	AppBar,
	Box,
	Collapse,
	Container,
	Grid,
	Paper,
	TextField,
	Tab,
	Tabs,
	Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
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
		fontSize: '1.1rem',
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
		borderColor: '#006db3 !important'
	}
}))

const HomePage = (props) => {
	const classes = useStyles()

	const [name, setName] = useState('')
	const [nameError, setNameError] = useState(false)
	const [tabValue, setTabValue] = useState(0)
	const [errorOpen, setErrorOpen] = React.useState(false)

	useEffect(() => {
		if (props.inGame) props.history.push('/game')
		if (props.error !== null) setErrorOpen(true)
	}, [props.history, props.inGame, props.error])

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

	// Functions for Tabs
	const TabPanel = (props) => {
		const { children, value, index, ...other } = props

		return (
			<Typography
				component="div"
				role="tabpanel"
				hidden={value !== index}
				id={`full-width-tabpanel-${index}`}
				aria-labelledby={`full-width-tab-${index}`}
				{...other}
			>
				{value === index && <Box p={3}>{children}</Box>}
			</Typography>
		)
	}

	const a11yProps = (index) => {
		return {
			id: `full-width-tab-${index}`,
			'aria-controls': `full-width-tabpanel-${index}`
		}
	}

	const handleCreateGameFormSubmit = (gameType) => {
		if (name) {
			props.createGame({
				gameType,
				name,
				pid: localStorage.getItem('playerId')
					? localStorage.getItem('playerId')
					: null
			})
		} else {
			setNameError(true)
		}
	}

	const handleJoinGameFormSubmit = (gameCode, position) => {
		if (name) {
			props.joinGame({
				gameCode,
				name,
				position,
				pid: localStorage.getItem('playerId')
					? localStorage.getItem('playerId')
					: null
			})
		} else {
			setNameError(true)
		}
	}

	const handleNameInputChange = (e) => {
		setName(e.target.value)
	}

	const handleTabChange = () => {
		setTabValue(1 - tabValue)
	}

	const { locked } = props

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
				<Grid item container justify="center" alignContent="center">
					<Typography
						variant="h2"
						component="h2"
						className={classes.title}
					>
						cards.io
					</Typography>
				</Grid>
				<Grid item container justify="center" alignContent="center">
					<Paper className={classes.mainPaper} elevation={6}>
						<Mobile>
							<AppBar position="static" color="default">
								<Tabs
									value={tabValue}
									indicatorColor="secondary"
									textColor="secondary"
									centered
									variant="fullWidth"
									aria-label="full width tabs example"
									onChange={handleTabChange}
								>
									<Tab
										label="Create Game"
										{...a11yProps(0)}
									/>
									<Tab label="Join Game" {...a11yProps(1)} />
								</Tabs>
							</AppBar>
						</Mobile>
						<Grid container className={classes.paperGridContainer}>
							<Grid
								container
								item
								xs={12}
								sm={12}
								xl={12}
								justify="center"
							>
								<Collapse in={errorOpen}>
									<Alert severity="error">
										{props.error ? props.error.message : ''}
									</Alert>
								</Collapse>
							</Grid>
							<Grid
								container
								item
								xs={12}
								sm={12}
								xl={12}
								justify="center"
								className={classes.nameBigContainer}
							>
								<Grid item xs={2} sm={4} xl={4}></Grid>
								<Grid
									container
									item
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
										onChange={handleNameInputChange}
										error={nameError}
									/>
								</Grid>
								<Grid item xs={2} sm={4} xl={4}></Grid>
							</Grid>
							<Desktop>
								<Grid container item xs={12}>
									<Grid
										container
										item
										xs
										className={classes.sectionGrid}
									>
										<CreateGameForm
											createGame={
												handleCreateGameFormSubmit
											}
											locked={locked}
										/>
									</Grid>
									<Grid
										container
										justify="center"
										item
										xs={1}
									>
										<div className="split-layout__divider">
											<div className="split-layout__rule"></div>
											<div className="split-layout__label">
												OR
											</div>
											<div className="split-layout__rule"></div>
										</div>
									</Grid>
									<Grid
										container
										item
										xs
										className={classes.sectionGrid}
									>
										<JoinGameForm
											joinGame={handleJoinGameFormSubmit}
											probeGame={props.probeGameRequest}
											players={props.players}
											locked={locked}
										/>
									</Grid>
								</Grid>
							</Desktop>
							<Mobile>
								<Grid container item xs={12}>
									<TabPanel value={tabValue} index={0}>
										<Grid
											container
											item
											xs
											className={classes.sectionGrid}
										>
											<CreateGameForm
												createGame={
													handleCreateGameFormSubmit
												}
												locked={locked}
											/>
										</Grid>
									</TabPanel>
									<TabPanel value={tabValue} index={1}>
										<Grid
											container
											item
											xs
											className={classes.sectionGrid}
										>
											<JoinGameForm
												joinGame={
													handleJoinGameFormSubmit
												}
												probeGame={
													props.probeGameRequest
												}
												players={props.players}
												locked={locked}
											/>
										</Grid>
									</TabPanel>
								</Grid>
							</Mobile>
						</Grid>
					</Paper>
				</Grid>
				<Grid item container justify="center" alignContent="center">
					<Typography
						variant="h6"
						component="h6"
						className={classes.footer}
					>
						{'Made With \u2764 By Delta Force'}
					</Typography>
				</Grid>
			</Grid>
			<LoaderModal
				show={
					!errorOpen &&
					(locked || localStorage.getItem('gameCode') !== null)
				}
			/>
		</Container>
	)
}

HomePage.propTypes = {
	createGame: PropTypes.func.isRequired,
	joinGame: PropTypes.func.isRequired,
	locked: PropTypes.bool.isRequired,
	probeGameRequest: PropTypes.func.isRequired,
	players: PropTypes.array,
	inGame: PropTypes.bool.isRequired,
	error: PropTypes.object
}

const mapStateToProps = (state) => {
	return {
		locked: state.locked,
		players: state.gameData.players,
		error: state.error,
		inGame: state.inGame
	}
}
const mapDispatchToProps = (dispatch) => ({
	createGame: (user) => dispatch(gameActions.createGame(user)),
	probeGameRequest: (gameCode) =>
		dispatch(gameActions.getPlayersList(gameCode)),
	joinGame: (user) => dispatch(gameActions.joinGameRequest(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
