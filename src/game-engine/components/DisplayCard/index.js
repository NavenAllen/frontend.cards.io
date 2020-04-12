import React from 'react'

export const DisplayCard = (props) => {
	return (
		<>
			<div
				onClick={props.onClick}
				id={props.value}
				disableHover={props.hide ? 'true' : 'false'}
				style={{ ...props.style }}
			>
				{props.hide ? (
					<img
						alt={props.value}
						height="100%"
						srcSet="https://raw.githubusercontent.com/htdebeer/SVG-cards/master/png/2x/back-aqua.png"
					/>
				) : (
					<img
						alt={props.value}
						height="100%"
						src={`https://richardschneider.github.io/cardsJS/cards/${props.value}.svg`}
					/>
				)}
			</div>
		</>
	)
}

export default DisplayCard
