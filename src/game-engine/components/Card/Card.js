import React, { useEffect } from 'react'
import * as PIXI from 'pixi.js'

import { rendererLoader } from '../../renderer'

const Card = (props) => {
	const { parent, hidden, index, value, onClick, scale } = props

	const createCard = (props) => {
		var url = hidden ? 'red.svg' : `${value}.svg`
		const texture = rendererLoader.resources.cardData.textures[url]

		const card = new PIXI.Sprite(texture)
		card.scale.set(scale)

		if (!hidden) {
			card.interactive = true
			card.x += index * 35
			card.on('pointerover', () => {
				card.y -= 15
			})
			card.on('pointerout', () => {
				card.y += 15
			})
			card.on('pointerdown', () => {
				onClick(value)
			})
		} else {
			card.anchor.set(0, 1)
			card.angle = index * 4
			card.y = card.height * card.anchor.y
		}

		parent.push(card)
	}

	useEffect(() => {
		createCard(props)
	})

	return <></>
}

export default Card
