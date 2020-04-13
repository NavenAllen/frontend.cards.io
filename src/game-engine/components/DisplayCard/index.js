import React from 'react'

export const DisplayCard = (props) => {
	return (
		<>
			<div
				onClick={props.onClick}
				id={props.value}
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
						height="100px"
						width="auto"
						src={`cards/${props.value}.svg`}
					/>
				)}
			</div>
		</>
	)
}

export default DisplayCard
