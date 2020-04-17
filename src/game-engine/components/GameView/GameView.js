import React, { useEffect, useState } from 'react'

import Hand from '../Hand/Hand'

import { findHandCoordinates } from '../../../util/handCoordinates'

import './GameView.css'

const GameView = (props) => {
	const { renderer, player, others, currentTurn, disabled } = props

	const [coordinates, setCoordinates] = useState(
		findHandCoordinates(
			renderer.app.screen.width,
			renderer.app.screen.height,
			renderer.cardsScale,
			others.length
		)
	)

	useEffect(() => {
		if (renderer.otherContainer.children.length > others.length)
			renderer.otherContainer.removeChildren(others.length)
		if (renderer.playerContainer.children.length > 1)
			renderer.playerContainer.removeChildren(1)
		if (renderer.app.ticker.started) renderer.app.ticker.start()
		setCoordinates(
			findHandCoordinates(
				renderer.app.screen.width,
				renderer.app.screen.height,
				renderer.cardsScale,
				others.length
			)
		)
	}, [
		renderer,
		renderer.otherContainer.children.length,
		renderer.playerContainer.children.length,
		others.length
	])

	return (
		<>
			{others.map((player, index) => (
				<Hand
					parent={renderer.otherContainer}
					cards={Array(player.count).fill('')}
					key={index}
					index={index}
					scale={renderer.cardsScale}
					x={coordinates.others[index].x}
					y={coordinates.others[index].y}
					disabled={disabled}
					position={player.position}
					name={player.name}
					currentTurn={player.position === currentTurn}
					hidden={true}
				/>
			))}
			{
				<Hand
					index={0}
					parent={renderer.playerContainer}
					scale={Math.max(renderer.cardsScale, 0.3)}
					x={coordinates.player.x}
					y={coordinates.player.y}
					cards={player.hand}
				/>
			}
		</>
	)
}

export default GameView
