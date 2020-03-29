import React from 'react'
import './CardColumn.css'
import ranks from './ranks'

const CardColumn = (props) => {
	const display = isNaN(parseInt(props.value))
		? [[ranks[1].col1], [ranks[1].col2]]
		: [[ranks[props.value].col1], [ranks[props.value].col2]]

	const settings = { display: 0, column: '2' }

	switch (props.order) {
		case '2':
			settings.display = 1
			settings.column = '3'
			break
		case '3':
			settings.display = 0
			settings.column = '4'
			break
		default:
			break
	}

	return (
		<>
			{' '}
			{display[settings.display][0].map((item) => {
				return (
					<div
						key={item}
						className={item}
						style={{
							gridColumn: settings.column,
							fontSize: '1.7em'
						}}
					>
						{props.suit}
					</div>
				)
			})}{' '}
		</>
	)
}

export default CardColumn
