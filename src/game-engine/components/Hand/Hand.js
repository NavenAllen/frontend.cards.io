import React, { useState, useEffect } from 'react'
import Card from '../Card/Card.js'
import PropTypes from 'prop-types'
import classes from './Hand.module.css'
import { connect } from 'react-redux'
import { gameActions } from '../../state/actions/index.js'

const Hand = (props) => {
	const defaultCardStyle = {
		num: '',
		shape: ''
	}
	const [hover, setHover] = useState(false)
	useEffect(() => {
		if (!props.folded) setHover(false)
	}, [props.folded])
	const [style, setStyle] = useState({})
	const num_cards = Math.floor((props.cards.length || props.cards.count) / 2)
	let cards
	if (props.hide) {
		cards = Array(props.cards.count)
		cards.fill(defaultCardStyle, 0, props.cards.count)
	} else cards = props.cards
	const [cardStyle, setCardStyle] = useState(defaultCardStyle)
	const transfer_card = (card, card_index) => {
		if (props.hide) return
		props.selectCard(card)
		let dest = parseInt(
			prompt('To which deck you want to transfer, enter index')
		)
		let sour = parseInt(props.index)
		if (sour === dest) {
			alert('Source cannot be same as destination')
			return
		}
		let source = document.querySelector(
			`.${classes.hand}:nth-of-type(${sour + 1})`
		)
		let destination = document.querySelector(
			`.${classes.hand}:nth-of-type(${dest + 1})`
		)
		let d = destination.getBoundingClientRect()
		let s = source.getBoundingClientRect()
		setCardStyle(card)
		setStyle({
			top: s.y,
			left: s.x,
			position: 'fixed',
			transition: 'none'
		})
		setTimeout(() => {
			destination.style.zIndex = -1
			setStyle({
				top: d.y,
				left: !props.folded
					? d.x + destination.childElementCount * 30
					: d.x,
				transform: !props.folded
					? `rotate(${
							(destination.childElementCount - num_cards) * 10
					  }deg)`
					: `rotate(${
							(destination.childElementCount - num_cards) * 3
					  }deg)`,
				position: 'fixed',
				zIndex: 1,
				transition: '1s'
			})
			setTimeout(() => {
				props.transfer_card(sour, dest, card_index)
				setCardStyle(defaultCardStyle)
				destination.style.zIndex = 0
			}, 1000)
		}, 100)
	}
	const askCardSelect = (card) => {
		props.askCardSelect(card)
	}
	return (
		<>
			<ul
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
							key={card.shape + card.num}
							index={index}
							hover={hover}
							onClick={() => askCardSelect(card)}
							cards={num_cards}
							hide={props.hide}
							style={
								cardStyle.shape === card.shape &&
								cardStyle.num === card.num
									? style
									: {}
							}
						/>
					) : (
						<Card
							transfer_card={props.transfer_card}
							folded={props.folded}
							value={card}
							key={card.shape + card.num}
							index={index}
							hover={hover}
							onClick={() => transfer_card(card, index)}
							cards={num_cards}
							hide={props.hide}
							style={
								cardStyle.shape === card.shape &&
								cardStyle.num === card.num
									? style
									: {}
							}
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
