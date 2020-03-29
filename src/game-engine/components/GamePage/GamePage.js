import React from 'react'
import './GamePage.css'
import { Engine } from '../../engine'

const GamePage = (props) => {
	let { deal, fold, game } = Engine({})
	return (
		<>
			<button
				style={{
					position: 'absolute',
					left: '50vw',
					top: '50vh'
				}}
				onClick={fold}
			>
				Fold all
			</button>
			<button
				style={{
					position: 'absolute',
					left: '50vw',
					top: '60vh'
				}}
				onClick={() => deal(4)}
			>
				Deal
			</button>
			{game}
		</>
	)
}

export default GamePage
