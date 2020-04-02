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
	let { game } = Engine({ playerCards: player.hand, otherPlayers })
	const [open, setOpen] = useState(false)
	const handleClose = () => {
		setOpen((prev) => !prev)
	}
	return (
		<>
			{/* <button
				style={{
					position: 'absolute',
					left: '45vw',
					top: '50vh'
				}}
				onClick={fold}
			>
				Fold all
			</button>
			<button
				style={{
					position: 'absolute',
					left: '45vw',
					top: '60vh'
				}}
				onClick={() => deal(4)}
			>
				Deal
			</button>
			<button
				style={{
					position: 'absolute',
					left: '45vw',
					top: '70vh'
				}}
				onClick={handleClose}
			>
				Declare
			</button> */}
			{game}
			{open && <Declare open={open} handleClose={handleClose} />}
		</>
	)
}

export default GamePage
