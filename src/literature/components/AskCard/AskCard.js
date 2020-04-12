import React, { useState, useEffect, useCallback } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Tabs,
	Tab
} from '@material-ui/core'

import classes from './AskCard.module.css'
import { literatureGameActions } from '../../state/actions/game.actions'
import { useDispatch, useSelector } from 'react-redux'
import DisplayCards from '../Declare/components/DisplayCards'
import * as LiteratureConstants from '../../constants'

const AskCard = ({ open, handleClose }) => {
	const [suit, setSuit] = useState('H')
	const [avalaibleSuits, setAvailableSuits] = useState(
		LiteratureConstants.suits
	)
	const [cards, setCards] = useState([])
	const [order, setOrder] = useState(0)
	const [avalaibleOrders, setAvailableOrders] = useState(
		LiteratureConstants.orders
	)
	const [availableSets, setAvailableSets] = useState(LiteratureConstants.sets)

	const dispatch = useDispatch()
	const userCards = useSelector((state) => state.playerData.hand)
	const locked = useSelector((state) => state.locked)
	const user = useSelector((state) => state.playerData)
	const game = useSelector((state) => state.gameData)

	const opponents = game.players.filter(
		(player) =>
			player.position !== user.position &&
			player.position % 2 !== user.position % 2
	)
	const [selectedOpponent, setselectedOpponent] = useState(
		opponents[0].position
	)

	useEffect(() => {
		userCards.forEach((card) => {
			let cardValue = card[0]
			if (card !== 'JOKER' && cardValue !== '8') {
				let cardSuit = card[1]
				if (LiteratureConstants.lowerRanks.indexOf(cardValue) !== -1) {
					setAvailableOrders((previousOrders) => {
						return previousOrders.map((order) => {
							if (order.value === 0) order.present = true
							return order
						})
					})
					setAvailableSets((previousAvailableSets) => {
						let updatedAvailableSets = previousAvailableSets
						updatedAvailableSets['lower'] = updatedAvailableSets[
							'lower'
						].map((suit) => {
							if (suit.value === cardSuit) suit.present = true
							return suit
						})
						return updatedAvailableSets
					})
				} else {
					setAvailableOrders((previousOrders) => {
						return previousOrders.map((order) => {
							if (order.value === 1) order.present = true
							return order
						})
					})
					setAvailableSets((previousAvailableSets) => {
						let updatedAvailableSets = previousAvailableSets
						updatedAvailableSets['higher'] = updatedAvailableSets[
							'higher'
						].map((suit) => {
							if (suit.value === cardSuit) suit.present = true
							return suit
						})
						return updatedAvailableSets
					})
				}
			} else {
				setAvailableOrders((previousOrders) => {
					return previousOrders.map((order) => {
						if (order.value === 2) order.present = true
						return order
					})
				})
				setAvailableSets((previousAvailableSets) => {
					let updatedAvailableSets = previousAvailableSets
					updatedAvailableSets['jokers'][0].present = true
					return updatedAvailableSets
				})
			}
		})
	}, [userCards])
	useEffect(() => {
		let ret = []
		if (order !== 2) {
			for (let i = order * 6; i < order * 6 + 6; i++) {
				if (
					userCards.indexOf(LiteratureConstants.ranks[i] + suit) ===
					-1
				)
					ret.push({
						value: LiteratureConstants.ranks[i] + suit,
						assignedTo: ''
					})
			}
		} else {
			let suits = ['H', 'C', 'D', 'S']
			suits.forEach((suit) => {
				if (userCards.indexOf('8' + suit) === -1)
					ret.push({
						value: '8' + suit,
						assignedTo: ''
					})
			})
			let jokerCount = 0
			userCards.forEach((card) => {
				if (card === 'JOKER') jokerCount++
			})
			for (let i = jokerCount; i < 2 - jokerCount; i++)
				ret.push({
					value: 'JOKER',
					assignedTo: ''
				})
		}
		ret = ret.filter((item) => userCards.indexOf(item.value) === -1)
		setCards(ret)
	}, [suit, order, userCards])
	useEffect(() => {
		if (order === 0) setAvailableSuits(availableSets['lower'])
		else if (order === 1) setAvailableSuits(availableSets['higher'])
		else setAvailableSuits(availableSets['jokers'])

		let initialSuit
		avalaibleSuits.forEach((suit) => {
			if (suit.present) initialSuit = suit.value
		})
		setSuit(initialSuit)
	}, [order, availableSets, avalaibleSuits])

	const assign = (card) => {
		askCard(card.value)
	}
	const askCard = useCallback(
		(card) => {
			if (!locked)
				dispatch(
					literatureGameActions.playAsk({
						code: game.code,
						fid: user.id,
						tpos: selectedOpponent,
						card
					})
				)
			handleClose()
		},
		[locked, dispatch, game.code, user.id, selectedOpponent, handleClose]
	)

	return (
		<Dialog open={open} onExit={handleClose} className={classes.modal}>
			<DialogTitle>Declare cards</DialogTitle>
			<DialogContent>
				<p className={classes.p}>Select order</p>
				<Tabs
					value={order}
					classes={{
						flexContainer: classes.tabs
					}}
					onChange={(e, newVal) => setOrder(newVal)}
				>
					{avalaibleOrders.map((order) => {
						if (order.present)
							return (
								<Tab value={order.value} label={order.name} />
							)
						else return null
					})}
				</Tabs>
				<p className={classes.p}>Select suit</p>
				<Tabs
					value={suit}
					classes={{
						flexContainer: classes.tabs
					}}
					onChange={(e, newVal) => setSuit(newVal)}
				>
					{avalaibleSuits.map((suit) => {
						if (suit.present)
							return <Tab value={suit.value} label={suit.name} />
						else return null
					})}
				</Tabs>
				<p className={classes.p}>Select Opponent</p>
				<Tabs
					value={selectedOpponent}
					classes={{
						flexContainer: classes.tabs
					}}
					onChange={(e, newVal) => setselectedOpponent(newVal)}
				>
					{opponents.map((opponent) => (
						<Tab
							value={opponent.position}
							key={opponent.position}
							label={opponent.name}
						></Tab>
					))}
				</Tabs>
				<p className={classes.p}>Select card</p>
				<DisplayCards
					classes={classes}
					cards={cards}
					onCardClick={assign}
				/>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					color="secondary"
					onClick={handleClose}
				>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AskCard
