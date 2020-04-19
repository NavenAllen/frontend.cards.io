import * as PIXI from 'pixi.js'

import { rendererLoader } from './renderer'

const createCard = (value, cardPosition, scale, hidden, index) => {
	var url = hidden ? 'blue.svg' : `${value}.svg`
	const texture = rendererLoader.resources.cardData.textures[url]

	const card = new PIXI.Sprite(texture)
	card.scale.set(scale)

	if (!hidden) {
		// Separation between player cards
		let gapFactor = 50 * scale
		card.interactive = true

		card.x += cardPosition * gapFactor
		card.y -= card.height
		card.on('pointerover', () => {
			card.y -= 15
		})
		card.on('pointerout', () => {
			card.y += 15
		})
	} else {
		card.anchor.set(0, 1)
		card.angle = cardPosition * 4

		card.y = card.height * card.anchor.y
	}

	return card
}

export { createCard }
