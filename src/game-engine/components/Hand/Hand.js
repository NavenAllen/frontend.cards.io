import React, { useEffect } from 'react'
import * as PIXI from 'pixi.js'

import Card from '../Card/Card'

const Hand = (props) => {
	const { parent, cards, count, x, y, scale, position, disabled } = props
	var children = []

	const createText = () => {
		var textContainer = new PIXI.Container()
		let style = new PIXI.TextStyle({
			fontFamily: 'Poppins',
			fontWeight: 'bold'
		})

		let pos = new PIXI.Text(position, style)
		pos.anchor.set(0.5)
		pos.x = textContainer.width / 2
		pos.scale.set(scale)
		textContainer.addChild(pos)

		let name = new PIXI.Text(props.name, style)
		name.anchor.set(0.5)
		name.y = textContainer.height
		name.x = textContainer.width / 2
		name.scale.set(scale)
		textContainer.addChild(name)

		return textContainer
	}

	const createHand = () => {
		const container = new PIXI.Container()
		parent.push(container)

		if (x) container.x = x
		if (y) container.y = y

		children.forEach((item) => {
			container.addChild(item)
		})

		container.pivot.set(container.width / 2, container.height / 2)

		if (!cards) {
			var text = createText()
			text.pivot.set(text.width / 2, text.height / 2)
			container.addChild(text)
			text.y = container.height
			text.x = container.width / 2

			if (!disabled) {
				container.interactive = true
				container.on('pointerover', () => {
					container.y -= 20
				})
				container.on('pointerout', () => {
					container.y += 20
				})
			}
		} else {
			container.y -= (2 * container.height) / 3
		}
	}

	useEffect(() => {
		createHand()
	})

	return (
		<>
			{cards
				? cards.map((value, index) => (
						<Card
							parent={children}
							index={index}
							key={index}
							scale={scale}
							onClick={(value) => {
								console.log('Clicked value: ' + value)
							}}
							value={value}
						/>
				  ))
				: [...Array(count)].map((value, index) => (
						<Card
							parent={children}
							index={index - Math.floor(count / 2)}
							key={index}
							scale={scale}
							hidden
						/>
				  ))}
		</>
	)
}

export default Hand
