import React, { useEffect } from 'react'
import * as PIXI from 'pixi.js'

import Card from '../Card/Card'

const Hand = (props) => {
	const { parent, cards, count, x, y, scale } = props
	var children = []

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
			container.interactive = true
			container.on('pointerover', () => {
				container.y -= 20
			})
			container.on('pointerout', () => {
				container.y += 20
			})
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
