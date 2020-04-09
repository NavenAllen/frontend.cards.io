import React, { useEffect, useState } from 'react'

import Hand from '../Hand/Hand'

import { findHandCoordinates } from '../../../util/handCoordinates'

import './GameView.css'

let otherHands = []
let playerHands = []

const GameView = (props) => {
	const { renderer, player, others, disabled } = props

	const [coordinates, setCoordinates] = useState(
		findHandCoordinates(
			renderer.app.screen.width,
			renderer.app.screen.height,
			renderer.cardsScale,
			50,
			50,
			others.length
		)
	)

	useEffect(() => {
		setCoordinates(
			findHandCoordinates(
				renderer.app.screen.width,
				renderer.app.screen.height,
				renderer.cardsScale,
				50,
				50,
				others.length
			)
		)

		otherHands.forEach((item) => {
			renderer.otherContainer.addChild(item)
		})
		playerHands.forEach((item) => {
			renderer.playerContainer.addChild(item)
		})
	}, [renderer, others])

	return (
		<>
			{others.map((player, index) => (
				<Hand
					parent={otherHands}
					count={player.count}
					key={index}
					scale={renderer.cardsScale}
					x={coordinates.others[index].x}
					y={coordinates.others[index].y}
					disabled={disabled}
					position={player.position}
					name={player.name}
				/>
			))}
			<Hand
				parent={playerHands}
				scale={Math.max(renderer.cardsScale, 0.3)}
				x={coordinates.player.x}
				y={coordinates.player.y}
				cards={player.hand}
			/>
		</>
	)
}

export default GameView
