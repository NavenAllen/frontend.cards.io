import React from 'react'
import { Card } from '../../../../game-engine/components/Card/Card'

export const DisplayCards = ({ assign, cards, classes }) => {
	return (
		<div className={classes.cardContainer}>
			{cards.map((card, ind1) => (
				<Card
					folded={false}
					value={card}
					key={card.shape + card.num}
					onClick={() => assign(card)}
					index={ind1}
					cards={cards}
					style={{
						left: 0,
						position: 'relative',
						display: 'inline-block',
						opacity: card.assignedTo == '' ? 1 : 0.3,
						margin: '10px 0'
					}}
				/>
			))}
		</div>
	)
}
