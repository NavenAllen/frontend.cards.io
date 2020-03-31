import React from 'react'
import CardDisplay from './CardDisplay'
import './Card.css'

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
	let folded = { position: 'absolute', fontSize: props.fontSize }
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
				className={'card'}
				style={{ ...cardColor, ...folded, ...props.style }}
			>
				<CardDisplay value={value} suit={suit} shape={shape} />
			</div>
		</>
	)
}

export default Card
