import React, { useState, useEffect } from 'react'
import Card from '../Card/Card.js'
import PropTypes from 'prop-types'
import classes from './Hand.module.css'
import { connect } from 'react-redux'
import { gameActions } from '../../state/actions/index.js'

const Hand = (props) => {
	const [hover, setHover] = useState(false)
	useEffect(() => {
		if (!props.folded) setHover(false)
	}, [props.folded])
	const num_cards = Math.floor((props.cards.length || props.cards.count) / 2)
	let cards
	if (props.hide) {
		cards = []
		for (let i = 0; i < props.cards.count; i++)
			cards.push(`${i}blank${props.cards.name}`)
	} else cards = props.cards
	const askCardSelect = (card) => {
		props.askCardSelect(card)
	}
	return (
		<>
			<ul
				id={`deck-${props.position}`}
				className={`${classes.hand} ${
					props.hide ? classes.handother : classes.handuser
				}`}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				{cards.map((card, index) =>
					props.inAskCard ? (
						<Card
							transfer_card={props.transfer_card}
							folded={props.folded}
							value={card}
							key={card}
							index={index}
							hover={hover}
							onClick={() => askCardSelect(card)}
							cards={num_cards}
							hide={props.hide}
						/>
					) : (
						<Card
							transfer_card={props.transfer_card}
							folded={props.folded}
							value={card}
							key={card}
							index={index}
							hover={hover}
							onClick={() => props.onCardClick(card)}
							cards={num_cards}
							hide={props.hide}
						/>
					)
				)}
			</ul>
		</>
	)
}

Hand.propTypes = {
	cardSelected: PropTypes.object,
	selectCard: PropTypes.func
}
const mapStateToProps = (state) => {
	return {
		cardSelected: state.cardSelected
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		selectCard: (card) => dispatch(gameActions.cardSelected(card))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Hand)
