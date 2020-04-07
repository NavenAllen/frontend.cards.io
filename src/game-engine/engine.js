import { useDispatch } from 'react-redux'

//import Game from './components/Game/Game'
import { gameActions } from './state/actions/'

export const Engine = ({ otherPlayers, playerCards, onCardClick, userPos }) => {
	const dispatch = useDispatch()
	const setCardStyle = (card, styles) => {
		for (let k in styles) card.style[k] = styles[k]
	}
	const transferCard = (card, fromPosition, toPosition, callback) => {
		// return
		if (fromPosition === toPosition) {
			alert('Source cannot be same as destination')
			return
		}
		let sourceDeck = document.querySelector(`#deck-${fromPosition}`)
		let sourceCard = document.querySelector(`img[alt="${card}"]`)
			.parentElement
		let destination = document.querySelector(
			`#deck-${toPosition} div:last-child`
		)
		let { left: sx, top: sy } = sourceCard.getBoundingClientRect()
		let { left: dx, top: dy } = destination.getBoundingClientRect()
		document.body.appendChild(sourceCard)
		setCardStyle(sourceCard, {
			position: 'fixed',
			left: `${sx}px`,
			top: `${sy}px`
		})
		setTimeout(() => {
			setCardStyle(sourceCard, {
				left: `${dx - 20}px`,
				top: `${dy - 20}px`,
				transform: `scale(0.7)`
			})
			setTimeout(() => {
				sourceDeck.appendChild(sourceCard)
				dispatch(gameActions.addCard(card, fromPosition, toPosition))
				callback()
			}, 900)
		}, 100)
	}
	return {
		game: {
			/*
				<Game
					players={otherPlayers}
					playerCards={playerCards}
					onCardClick={onCardClick}
					userPos={userPos}
				/>
			*/
		},
		transferCard
	}
}
