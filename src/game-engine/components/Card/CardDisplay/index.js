import React from 'react'
import classNames from 'classnames'
import { suitPositions } from './ranks'
import './CardDisplay.css'

const FaceCard = (props) => {
	const { value, shape } = props
	return (
		<span class="face middle_center">
			<img
				alt="face"
				src={'img/faces/face-' + value + '-' + shape + '.png'}
			/>
		</span>
	)
}

const CardDisplay = (props) => {
	let { value, suit, shape } = props
	let isRed = false,
		isFace = false,
		isAce = false

	if (value === 'A') isAce = true
	else if (isNaN(parseInt(value))) isFace = true
	if (shape === 'D' || shape === 'H') isRed = false

	return (
		<div className={[isRed ? 'red' : '', isAce ? 'card-ace' : '']}>
			<div className={classNames(['corner', 'top'])}>
				<span className={'number'}>{value}</span>
				<span>{suit}</span>
			</div>

			{!isFace ? (
				suitPositions[value].map((positionClassNames) => {
					return (
						<div className={classNames(positionClassNames)}>
							{suit}
						</div>
					)
				})
			) : (
				<FaceCard value={value} shape={shape}></FaceCard>
			)}
			<div className={classNames(['corner', 'bottom'])}>
				<span className={'number'}>{value}</span>
				<span>{suit}</span>
			</div>
			<div />
		</div>
	)
}

export default CardDisplay
