import React from 'react'
import DisplayCard from '../../../../game-engine/components/DisplayCard'

export const DisplayCards = ({ assign, cards, classes }) => {
	return (
		<div className={classes.cardContainer}>
			{cards.map((card, ind1) => (
				<DisplayCard
					value={card.value}
					key={card.value}
					onClick={() => assign(card)}
					index={ind1}
					cards={cards}
					style={{
						left: 0,
						position: 'relative',
						display: 'inline-block',
						opacity: card.assignedTo === '' ? 1 : 0.3,
						margin: '10px 0'
					}}
				/>
			))}
		</div>
	)
}
