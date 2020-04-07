import React, { useEffect, useState } from 'react'

import Hand from '../Hand/Hand'

import './GameView.css'

let otherHands = []
let playerHands = []

const binom = (n, k) => {
	var coeff = 1
	var i
	if (k < 0 || k > n) return 0
	for (i = 0; i < k; i++) coeff = (coeff * (n - i)) / (i + 1)
	return coeff
}

const bezierEqn = (points, t) => {
	let result = { x: 0, y: 0 }
	let n = points.length - 1
	for (let i = 0; i < points.length; i++) {
		result.x +=
			binom(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i) * points[i].x
		result.y +=
			binom(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i) * points[i].y
	}
	return result
}

const findHandCoordinates = (width, height, px, py, count) => {
	let points = [],
		results = []
	width = width - 2 * px
	height = height - 2 * py
	points.push({ x: 0, y: 0 })
	points.push({ x: 0, y: (2 * height) / 3 })
	points.push({ x: width / 3, y: height })
	points.push({ x: width / 2, y: height })
	points.push({ x: (2 * width) / 3, y: height })
	points.push({ x: width, y: (2 * height) / 3 })
	points.push({ x: width, y: 0 })

	let base = 1 / (count + 1)
	for (let i = 1; i < count + 1; i++) {
		let r = bezierEqn(points, i * base)
		r.y = height - r.y
		r.x += px
		r.y += py
		results.push(r)
	}

	return results
}

const GameView = (props) => {
	const { renderer } = props

	const [coordinates, setCoordinates] = useState(
		findHandCoordinates(
			renderer.app.screen.width,
			renderer.app.screen.height,
			50,
			50,
			renderer.totalPlayers - 1
		)
	)

	useEffect(() => {
		setCoordinates(
			findHandCoordinates(
				renderer.app.screen.width,
				renderer.app.screen.height,
				50,
				50,
				renderer.totalPlayers - 1
			)
		)

		otherHands.forEach((item) => {
			renderer.otherContainer.addChild(item)
		})
		playerHands.forEach((item) => {
			renderer.playerContainer.addChild(item)
		})
	}, [renderer])

	return (
		<>
			{[...Array(renderer.totalPlayers - 1)].map((value, index) => (
				<Hand
					parent={otherHands}
					count={5}
					key={index}
					scale={renderer.cardsScale}
					x={coordinates[index].x}
					y={coordinates[index].y}
				/>
			))}
			<Hand
				parent={playerHands}
				scale={0.8}
				x={500}
				y={500}
				cards={[
					'2S',
					'3S',
					'4S',
					'5S',
					'6S',
					'2S',
					'3S',
					'4S',
					'5S',
					'6S',
					'2S',
					'3S',
					'4S',
					'5S',
					'6S'
				]}
			/>
		</>
	)
}

export default GameView
