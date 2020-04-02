import React from 'react'
import { useDispatch } from 'react-redux'

import Game from './components/Game/Game'
import { gameActions } from './state/actions/'

export const Engine = ({ otherPlayers, playerCards, onCardClick, userPos }) => {
	const dispatch = useDispatch()
	// const setCardStyle = (card, styles) => {
	// 	console.log(styles, card)
	// 	for (let k in styles) card.style[k] = styles[k];
	// }
	const transferCard = (card, fromPosition, toPosition, callback) => {
		// return
		if (fromPosition === toPosition) {
			alert('Source cannot be same as destination')
			return
		}
		// let source = document.querySelector(
		// 	`img[alt="${card}"]`
		// ).parentElement
		// let destination = document.querySelector(
		// 	`#deck-${toPosition} div:last-child`
		// )
		// let s = source.getBoundingClientRect();
		// let d = destination.getBoundingClientRect();
		// setCardStyle(source, {
		// 	transform: `translateX(${Math.floor(d.x - s.x)}px) scale(0.6)`,
		// 	// top: `${d.x}px`
		// })
		setTimeout(() => {
			dispatch(gameActions.addCard(card, fromPosition, toPosition))
			callback()
		}, 1000)
	}
	return {
		game: (
			<Game
				players={otherPlayers}
				playerCards={playerCards}
				onCardClick={onCardClick}
				userPos={userPos}
			/>
		),
		transferCard
	}
}
