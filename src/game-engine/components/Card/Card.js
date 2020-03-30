import React from 'react'
import CardColumn from '../CardColumn/CardColumn.js'
import './Card.css'

const FaceCard = (props) => {
	const { value, shape } = props
	return (
		<img
			class="face"
			alt="face"
			src={'img/faces/face-' + value + '-' + shape + '.png'}
		/>
	)
}

export const Card = (props) => {
	const value = props.value.num === '0' ? '10' : props.value.num
	const shape = props.value.shape
	const suit = {
		C: '♣',
		D: '♦',
		H: '♥',
		S: '♠'
	}[props.value.shape]
	const cardColor =
		suit === '♥' || suit === '♦' || suit === '♡' || suit === '♢'
			? { color: 'red' }
			: { color: 'black' }
	let folded = { position: 'absolute' }
	if (!props.folded) {
		folded = {
			...folded,
			left: props.index * 30,
			transform: `rotate(${(props.index - props.cards) * 10}deg)`
		}
	} else {
		folded = {
			...folded,
			transform: `rotate(${(props.index - props.cards) * 3}deg)`
		}
	}
	if (props.hover) {
		folded = {
			...folded,
			transform: `rotate(${(props.index - props.cards) * 10}deg)`,
			left: props.index * 30
		}
	}
	return (
		<>
			<div
				onClick={props.onClick}
				id={value + suit}
				class="card"
				style={{ ...cardColor, ...folded, ...props.style }}
			>
				<div class="index">
					<div class="value">{value}</div>
					<div class="suit">{suit}</div>
				</div>
				{!isNaN(parseInt(value)) || value === 'A' ? (
					<div>
						<CardColumn order="0" value={value} suit={suit} />
						<CardColumn order="1" value={value} suit={suit} />
						<CardColumn order="2" value={value} suit={suit} />
					</div>
				) : (
					<FaceCard value={value} shape={shape} />
				)}
			</div>
		</>
	)
}

export default Card
