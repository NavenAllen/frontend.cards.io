import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

import DisplayCard from '../../../../game-engine/components/DisplayCard'

const useStyles = makeStyles((theme) => ({
	root: {
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		width: '100%',
		backgroundColor: theme.palette.background.paper
	},
	gridList: {
		flexWrap: 'nowrap',
		transform: 'translateZ(0)'
	}
}))

const DisplayCards = ({ onCardClick, cards, isCardOpaque }) => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<GridList className={classes.gridList} cols={7}>
				{cards.map((card, index) => (
					<GridListTile key={index} cols={1}>
						<DisplayCard
							value={card.value}
							key={card.value}
							onClick={() => onCardClick(card)}
							index={index}
							cards={cards}
							style={{
								left: 0,
								position: 'relative',
								display: 'inline-block',
								opacity: isCardOpaque(card) ? 1 : 0.3,
								margin: '10px 0'
							}}
						/>
					</GridListTile>
				))}
			</GridList>
		</div>
	)
}

export default DisplayCards
