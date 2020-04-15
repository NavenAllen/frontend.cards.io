import React, { useEffect, useState } from 'react'
import * as PIXI from 'pixi.js'

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
			50,
			50,
			others.length
		)
	)

	var otherContainer = new PIXI.Container({
		interactive: false
	})
	var playerContainer = new PIXI.Container({
		interactive: true
	})

	renderer.rootContainer.addChild(otherContainer)
	renderer.rootContainer.addChild(playerContainer)

	useEffect(() => {
		if (renderer.app.ticker.started) renderer.app.ticker.start()
		renderer.app.stage.removeChildren()
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
	}, [renderer, others])

	return (
		<>
			{others.map((player, index) => (
				<Hand
					parent={otherContainer}
					count={player.count}
					key={index}
					scale={renderer.cardsScale}
					x={coordinates.others[index].x}
					y={coordinates.others[index].y}
					disabled={disabled}
					position={player.position}
					name={player.name}
					currentTurn={player.position === currentTurn}
				/>
			))}
			<Hand
				parent={playerContainer}
				scale={Math.max(renderer.cardsScale, 0.3)}
				x={coordinates.player.x}
				y={coordinates.player.y}
				cards={player.hand}
			/>
		</>
	)
}

export default GameView
