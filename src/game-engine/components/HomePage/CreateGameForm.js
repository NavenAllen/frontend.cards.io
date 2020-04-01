import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './HomePage.css'

import { withStyles } from '@material-ui/core/styles'
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	Chip,
	Grid,
	IconButton
} from '@material-ui/core'

import { InfoOutlined as InfoIcon } from '@material-ui/icons'

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
		border: '3px solid',
		borderRadius: '8px',
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
		display: 'flex',
		padding: theme.spacing(0),
		'& > *': {
			padding: theme.spacing(1),
			paddingBottom: 0,
			'&:last-child': {
				paddingBottom: theme.spacing(0.7)
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

const createGameData = [
	{ name: 'Literature', tags: ['Team', '6 to 8'], rules: 'link' },
	{ name: 'Ace', tags: ['4 to 8'], rules: 'link' },
	{ name: 'Hearts', tags: ['Team', 'Only 4'], rules: 'link' },
	{ name: 'Bridge', tags: ['Team', '6 to 8'], rules: 'link' },
	{ name: 'Rummy', tags: ['4 to 6'], rules: 'link' }
]
const CreateGameForm = (props) => {
	const [name, setName] = useState('')
	const [position, setPosition] = useState(0)
	const [game, setGame] = useState('literature')

	const handleNameInputChange = (e) => {
		setName(e.target.value)
	}
	const handlePositionInputChange = (e) => {
		setPosition(e.target.value)
	}
	const handleCreateGameFormSubmit = () => {
		props.createGame({ name: name, position: position, game: game })
	}

	const handleCreateGameCardClick = (e) => {
		console.log('card', e)
	}

	const handleCreateGameInfoClick = (e) => {
		// Stop click event propagation to parent(handleCreateGameCardClick)
		e.stopPropagation()
		console.log('info', e)
	}

	const { classes, locked } = props
	return (
		<>
			{createGameData.map((game) => (
				<Grid item xl={4} sm={4} xs={12} className={classes.itemGrid}>
					<Card
						className={classes.card}
						variant="outlined"
						onClick={handleCreateGameCardClick}
					>
						<CardHeader
							action={
								<div>
									<IconButton
										aria-label="settings"
										fontSize="small"
										onClick={handleCreateGameInfoClick}
									>
										<InfoIcon />
									</IconButton>
								</div>
							}
							title={game.name}
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
			<Grid
				container
				xs={12}
				sm={12}
				xl={12}
				justify="center"
				className={classes.joinBtnContainer}
			>
				<Button size="small" variant="contained" color="primary">
					Host
				</Button>
			</Grid>
		</>
	)
}
CreateGameForm.propTypes = {
	createGame: PropTypes.func.isRequired,
	locked: PropTypes.bool.isRequired
}

export default withStyles(styles)(CreateGameForm)
