import React from 'react'
import { suitePositions } from './ranks'

const CardColumn = (props) => {
	let { order, value, suit } = props
	let settings = {}

	switch (order) {
		case '0':
			settings.left = '0.6em'
			break
		case '1':
			settings.left = '1.55em'
			break
		case '2':
			settings.left = '2.5em'
			break
		default:
			break
	}

	return (
		<>
			{' '}
			{suitePositions[value][parseInt(order)].map((item) => {
				return (
					<div
						key={item}
						className={item}
						style={{
							position: 'absolute',
							left: settings.left,
							top: item
						}}
					>
						{suit}
					</div>
				)
			})}{' '}
		</>
	)
}

export default CardColumn
