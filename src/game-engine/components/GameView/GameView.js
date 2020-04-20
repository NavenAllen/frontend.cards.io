/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useEffect, useState } from 'react'

import { createHand } from '../pixi/hand'
import { findHandCoordinates } from '../../../util/handCoordinates'

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

	const createOtherPlayerHands = () => {
		renderer.otherContainer.removeChildren()
		others.forEach((other, index) => {
			let isCurrentTurn = other.position === currentTurn
			let isOpponent = other.position % 2 !== player.position % 2
			renderer.otherContainer.addChild(
				createHand(
					Array(other.count).fill(''),
					other.name,
					other.position,
					isCurrentTurn,
					isOpponent,
					coordinates.others[index].x,
					coordinates.others[index].y,
					renderer.cardsScale,
					disabled,
					true
				)
			)
		})
	}

	const updateOtherPlayerHand = (other, index) => {
		let isCurrentTurn = other.position === currentTurn
		let isOpponent = other.position % 2 !== player.position % 2
		let childContainer = createHand(
			Array(other.count).fill(''),
			other.name,
			other.position,
			isCurrentTurn,
			isOpponent,
			coordinates.others[index].x,
			coordinates.others[index].y,
			renderer.cardsScale,
			disabled,
			true
		)

		renderer.otherContainer.removeChildAt(index)
		renderer.otherContainer.addChild(childContainer)
		renderer.otherContainer.setChildIndex(childContainer, index)
	}

	const updatePlayerHand = () => {
		renderer.playerContainer.removeChildren()
		renderer.playerContainer.addChild(
			createHand(
				player.hand,
				player.name,
				player.position,
				false,
				false,
				coordinates.player.x,
				coordinates.player.y,
				renderer.cardsScale,
				false,
				false
			)
		)
	}

	useEffect(() => {
		createOtherPlayerHands()
		updatePlayerHand()
	}, [coordinates])

	useEffect(() => {
		updatePlayerHand()
	}, [player.hand.length])

	useEffect(() => {
		if (renderer.otherContainer.children.length === others.length)
			others.forEach((player, index) => {
				updateOtherPlayerHand(player, index)
			})
	}, [others, currentTurn])

	useEffect(() => {
		setCoordinates(
			findHandCoordinates(
				renderer.app.screen.width,
				renderer.app.screen.height,
				renderer.cardsScale,
				others.length
			)
		)
	}, [others.length, renderer.cardsScale])

	return <></>
}

export default GameView
