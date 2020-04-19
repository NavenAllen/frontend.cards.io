import * as PIXI from 'pixi.js'
import { OutlineFilter } from '@pixi/filter-outline'

import { createCard } from './card'

const createHand = (
	cards,
	name,
	position,
	isCurrentTurn,
	isOpponent,
	x,
	y,
	scale,
	disabled,
	hidden
) => {
	const container = new PIXI.Container()
	const cardsContainer = new PIXI.Container()
	if (isCurrentTurn)
		cardsContainer.filters = [new OutlineFilter(4, 0xdc3545, 1)]

	if (x) container.x = x
	if (y) container.y = y

	cards.forEach((value, index) => {
		let cardPosition = index - Math.floor(cards.length / 2)
		cardsContainer.addChild(
			createCard(value, cardPosition, scale, hidden, index)
		)
		container.addChild(cardsContainer)
	})

	const createText = () => {
		var graphics = new PIXI.Graphics()
		var textContainer = new PIXI.Container()
		let style = new PIXI.TextStyle({
			fontFamily: 'Poppins',
			fontWeight: 'bold',
			fill: '#FFFFFF'
		})

		let nameText = new PIXI.Text(name, style)
		nameText.anchor.set(0, 0.5)
		nameText.y = textContainer.height
		nameText.scale.set(scale)
		textContainer.addChild(nameText)
		nameText.x = textContainer.x - textContainer.width / 2

		let cardsCountText = new PIXI.Text(cards.length + ' cards', style)
		cardsCountText.anchor.set(0, 0.5)
		cardsCountText.y = textContainer.height
		cardsCountText.scale.set(scale)
		textContainer.addChild(cardsCountText)
		cardsCountText.x = textContainer.x - cardsCountText.width / 2

		let pX = 50 * scale,
			pY = 20 * scale,
			marginY = 15 * scale,
			curveRadius = 15 * scale
		let lineColor = isOpponent ? 0x8b0000 : 0x013220
		let fillColor = isOpponent ? 0xff0000 : 0x000000
		graphics.lineStyle(2, lineColor, 1)
		graphics.beginFill(fillColor, 0.45)
		graphics.drawRoundedRect(
			textContainer.x - textContainer.width / 2 - pX / 2,
			textContainer.y - pY / 2 - marginY,
			textContainer.width + pX,
			textContainer.height + pY,
			curveRadius
		)
		graphics.endFill()

		textContainer.addChildAt(graphics, 0)

		return textContainer
	}

	if (hidden) {
		let marginY = 10,
			marginX = 3
		var text = createText()
		text.pivot.set(text.width / 2, text.height / 2)
		container.addChild(text)
		text.y = container.height + marginY * scale
		text.x = container.width / 2 - marginX * cards.length * scale

		if (!disabled) {
			container.interactive = true
			container.on('pointerover', () => {
				container.y -= 20
			})
			container.on('pointerout', () => {
				container.y += 20
			})
		}
	}

	return container
}

export { createHand }
