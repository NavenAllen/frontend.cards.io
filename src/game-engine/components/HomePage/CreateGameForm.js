import React, { useState } from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'

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
		margin: theme.spacing(0.8),
		'&:hover': {
			cursor: 'pointer'
		}
	},
	activeCard: {
		borderColor: theme.palette.success.dark,
		backgroundColor: theme.palette.success.light
	},
	chip: {
		marginLeft: theme.spacing(0.5),
		marginRight: theme.spacing(0.5),
		backgroundColor: theme.palette.secondary.light
		// color: 'white'
	},
	itemGrid: {
		alignContent: 'center'
	},
	cardHeader: {
		padding: theme.spacing(0.5),
		paddingLeft: theme.spacing(1.5),
		'&:last-child': {
			paddingBottom: theme.spacing(1)
		},
		'& > .MuiCardHeader-content > .MuiTypography-h5': {
			fontSize: '1.2rem',
			fontWeight: 'bold'
		}
	},
	cardContent: {
		padding: theme.spacing(0.5),
		paddingTop: 0,
		paddingBottom: 0,
		'&:last-child': {
			paddingBottom: theme.spacing(1)
		}
	},
	joinBtnContainer: {
		marginTop: theme.spacing(2)
	},
	formButton: {
		fontWeight: 'bold',
		'&:focus': {
			outline: 'none'
		}
	},
	infoButton: {
		color: 'black',
		'&:focus': {
			outline: 'none'
		}
	}
})

const createGameData = [
	{
		name: 'Literature',
		tags: ['Team', '6 to 8'],
		rules: 'link',
		type: 'literature'
	},
	{ name: 'Ace', tags: ['4 to 8'], rules: 'link', type: 'ace' },
	{ name: 'Hearts', tags: ['Team', 'Only 4'], rules: 'link', type: 'hearts' },
	{ name: 'Bridge', tags: ['Team', '6 to 8'], rules: 'link', type: 'bridge' },
	{ name: 'Rummy', tags: ['4 to 6'], rules: 'link', type: 'rummy' }
]

const CreateGameForm = (props) => {
	const [activeCard, setActiveCard] = useState(-1)

	const handleCreateGameFormSubmit = () => {
		if (activeCard >= 0) props.createGame(createGameData[activeCard].type)
	}

	const handleCreateGameCardClick = (index) => {
		setActiveCard(index)
	}

	const handleCreateGameInfoClick = (e) => {
		// Stop click event propagation to parent(handleCreateGameCardClick)
		e.stopPropagation()
	}

	const { classes, locked } = props
	return (
		<>
			{createGameData.map((game, index) => (
				<Grid
					item
					key={index}
					xl={4}
					md={4}
					sm={6}
					xs={12}
					className={classes.itemGrid}
				>
					<Card
						variant="outlined"
						className={classNames(
							classes.card,
							index === activeCard ? classes.activeCard : ''
						)}
						onClick={() => handleCreateGameCardClick(index)}
					>
						<CardHeader
							className={classes.cardHeader}
							action={
								<div>
									<IconButton
										aria-label="settings"
										className={classes.infoButton}
										onClick={handleCreateGameInfoClick}
									>
										<InfoIcon fontSize="small" />
									</IconButton>
								</div>
							}
							title={game.name}
						/>
						<CardContent className={classes.cardContent}>
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
				item
				xs={12}
				sm={12}
				xl={12}
				justify="center"
				className={classes.joinBtnContainer}
			>
				<Button
					size="small"
					variant="contained"
					color="primary"
					className={classes.formButton}
					onClick={handleCreateGameFormSubmit}
					disabled={locked || activeCard < 0}
				>
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
