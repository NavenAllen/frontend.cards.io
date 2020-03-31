import React, { useState } from 'react'
import './GamePage.css'
import { Engine } from '../../../game-engine/engine'
import { Declare } from '../Declare'

const GamePage = (props) => {
	let { deal, fold, game } = Engine({ num_players: 8 })
	const [open, setOpen] = useState(false)
	const handleClose = () => {
		setOpen((prev) => !prev)
	}
	return (
		<>
			<button
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
			</button>
			{game}
			{open && <Declare open={open} handleClose={handleClose} />}
		</>
	)
}

export default GamePage
