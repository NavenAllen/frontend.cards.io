import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import './GamePage.css'
import { Engine } from '../../../game-engine/engine'
import { Declare } from '../Declare'

const GamePage = (props) => {
	const player = useSelector((state) => state.playerData)
	const otherPlayers = useSelector((state) =>
		state.gameData.players.filter(
			(item) => item.position !== player.position
		)
	)
	const onCardClick = (card) => {
		if (player.hand.indexOf(card) === -1) return
		let position = parseInt(prompt('Enter position'))
		transferCard(card, player.position, position, () => {
			// action to perform after animation and transfer
			console.log('here')
		})
	}
	let { game, transferCard } = Engine({
		playerCards: player.hand,
		otherPlayers,
		onCardClick,
		userPos: player.position
	})
	const [open, setOpen] = useState(false)
	const handleClose = () => {
		setOpen((prev) => !prev)
	}
	return (
		<>
			{game}
			{open && <Declare open={open} handleClose={handleClose} />}
		</>
	)
}

export default GamePage
