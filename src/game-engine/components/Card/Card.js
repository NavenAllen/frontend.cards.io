import React from 'react'
import './Card.css'

export const Card = (props) => {
	let folded = { position: 'absolute', fontSize: props.fontSize }
	if (!props.folded) {
		folded = {
			...folded,
			left: props.index * 30,
			transform: `rotate(${(props.index - props.cards) * 5}deg)`
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
			transform: `rotate(${(props.index - props.cards) * 5}deg)`,
			left: props.index * 30
		}
	}
	return (
		<>
			<div
				onClick={props.onClick}
				id={props.value}
				className={'card'}
				disableHover={props.hide ? 'true' : 'false'}
				style={{ ...folded, ...props.style }}
			>
				{props.hide ? (
					<img
						alt={props.value}
						height="100%"
						srcSet="htps://raw.githubusercontent.com/htdebeer/SVG-cards/master/png/2x/back-aqua.png"
					/>
				) : (
					<img
						alt={props.value}
						height="100%"
						src={`htps://richardschneider.github.io/cardsJS/cards/${props.value}.svg`}
					/>
				)}
			</div>
		</>
	)
}

export default Card
