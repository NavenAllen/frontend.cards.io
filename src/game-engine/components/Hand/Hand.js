import React, { useEffect, useCallback } from 'react'
import * as PIXI from 'pixi.js'
import { OutlineFilter } from '@pixi/filter-outline'

import Card from '../Card/Card'

const Hand = (props) => {
	const {
		parent,
		cards,
		x,
		y,
		scale,
		position,
		currentTurn,
		disabled,
		hidden,
		index
	} = props
	const container = new PIXI.Container()
	if (currentTurn) container.filters = [new OutlineFilter(4, 0xf7c4c8, 0.5)]
	parent.addChild(container)
	parent.setChildIndex(container, index)

	if (x) container.x = x
	if (y) container.y = y

	useEffect(() => {
		if (container.children.length > cards.length + 1)
			container.removeChildren(cards.length + 1)
	}, [container, cards.length])

	const createText = useCallback(() => {
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
	}, [position, props.name, scale])

	const createHand = useCallback(() => {
		container.pivot.set(container.width / 2, container.height / 2)

		if (hidden) {
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
	}, [hidden, disabled, container, createText])

	useEffect(() => {
		createHand()
	}, [createHand])

	return (
		<>
			{!hidden
				? cards.map((value, index) => (
						<Card
							parent={container}
							key={index}
							index={index}
							scale={scale}
							cardPosition={index}
							onClick={(value) => {
								console.log('Clicked value: ' + value)
							}}
							value={value}
						/>
				  ))
				: cards.map((value, index) => (
						<Card
							parent={container}
							key={index}
							index={index}
							scale={scale}
							cardPosition={index - Math.floor(cards.length / 2)}
							hidden
						/>
				  ))}
		</>
	)
}

export default Hand
