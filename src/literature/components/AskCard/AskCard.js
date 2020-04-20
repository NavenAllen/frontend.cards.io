import React, { useState, useEffect, useCallback } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Tabs,
	Tab,
	Grid,
	Collapse
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import classes from './AskCard.module.css'
import { literatureGameActions } from '../../state/actions/game.actions'
import { useDispatch, useSelector } from 'react-redux'
import DisplayCards from '../Declare/components/DisplayCards'
import * as LiteratureConstants from '../../constants'

const AskCard = ({
	open,
	previousOptions,
	setPreviousOptions,
	handleClose
}) => {
	const [suit, setSuit] = useState(previousOptions.suit)
	const [availableSuits, setAvailableSuits] = useState(
		LiteratureConstants.suits
	)
	const [cards, setCards] = useState([])
	const [order, setOrder] = useState(previousOptions.order)
	const [availableOrders, setAvailableOrders] = useState(
		LiteratureConstants.orders
	)
	const [availableSets, setAvailableSets] = useState(LiteratureConstants.sets)

	const [errorOpen, setErrorOpen] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

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
		previousOptions.opponent
	)

	useEffect(() => {
		let availableOrders = LiteratureConstants.orders
		let availableSets = LiteratureConstants.sets
		userCards.forEach((card) => {
			let cardValue = card.slice(0, -1)
			if (card !== 'JOKER' && cardValue !== '8') {
				let cardSuit = card.slice(-1)
				if (LiteratureConstants.lowerRanks.indexOf(cardValue) !== -1) {
					availableOrders.map((order) => {
						if (order.value === 0) order.present = true
						return order
					})
					availableSets['lower'] = availableSets['lower'].map(
						(suit) => {
							if (suit.value === cardSuit) suit.present = true
							return suit
						}
					)
				} else {
					availableOrders.map((order) => {
						if (order.value === 1) order.present = true
						return order
					})
					availableSets['higher'] = availableSets['higher'].map(
						(suit) => {
							if (suit.value === cardSuit) suit.present = true
							return suit
						}
					)
				}
			} else {
				availableOrders.map((order) => {
					if (order.value === 2) order.present = true
					return order
				})
				availableSets['jokers'][0].present = true
			}
		})

		availableOrders = availableOrders.filter((order) => {
			return order.present
		})
		setAvailableOrders(availableOrders)

		availableSets['lower'] = availableSets['lower'].filter((set) => {
			return set.present
		})
		availableSets['higher'] = availableSets['higher'].filter((set) => {
			return set.present
		})
		availableSets['jokers'].filter((set) => {
			return set.present
		})
		setAvailableSets(availableSets)

		let availableSuits
		if (order === 0) availableSuits = availableSets['lower']
		else if (order === 1) availableSuits = availableSets['higher']
		else availableSuits = availableSets['jokers']
		setAvailableSuits(availableSuits)

		let selectedOrder = order,
			selectedOrderPresent = false
		for (let i = 0; i < availableOrders.length; i++) {
			if (
				availableOrders[i].value === order &&
				availableOrders[i].present
			) {
				selectedOrderPresent = true
				break
			}
			if (availableOrders[i].present)
				selectedOrder = availableOrders[i].value
		}
		if (!selectedOrderPresent) setOrder(selectedOrder)

		let selectedSuit = suit,
			selectedSuitPresent = false
		for (let i = 0; i < availableSuits.length; i++) {
			if (availableSuits[i].value === suit && availableSuits[i].present) {
				selectedSuitPresent = true
				break
			}
			if (availableSuits[i].present)
				selectedSuit = availableSuits[i].value
		}
		if (!selectedSuitPresent) setSuit(selectedSuit)
	}, [userCards, suit, order])

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
			for (let i = jokerCount; i < 2; i++) {
				ret.push({
					value: 'JOKER',
					assignedTo: ''
				})
			}
		}
		setCards(ret)
	}, [suit, order, userCards])

	useEffect(() => {
		if (order === 0) setAvailableSuits(availableSets['lower'])
		else if (order === 1) setAvailableSuits(availableSets['higher'])
		else setAvailableSuits(availableSets['jokers'])

		let selectedSuit = suit,
			selectedSuitPresent = false
		for (let i = 0; i < availableSuits.length; i++) {
			if (availableSuits[i].value === suit && availableSuits[i].present) {
				selectedSuitPresent = true
				break
			}
			if (availableSuits[i].present)
				selectedSuit = availableSuits[i].value
		}
		if (!selectedSuitPresent) setSuit(selectedSuit)
	}, [order, suit, availableSets, availableSuits])

	const assign = (card) => {
		askCard(card.value)
	}

	const handleModalClose = useCallback(() => {
		setPreviousOptions({
			suit,
			order,
			opponent: selectedOpponent
		})
		handleClose()
	}, [suit, order, selectedOpponent, setPreviousOptions, handleClose])

	const askCard = useCallback(
		(card) => {
			if (!selectedOpponent) {
				setErrorMessage('Choose a player!')
				setErrorOpen(true)
				return
			}
			if (!locked)
				dispatch(
					literatureGameActions.playAsk({
						code: game.code,
						fid: user.id,
						tpos: selectedOpponent,
						card
					})
				)
			handleModalClose()
		},
		[
			locked,
			dispatch,
			game.code,
			user.id,
			selectedOpponent,
			handleModalClose
		]
	)

	return (
		<Dialog open={open} onExit={handleClose} className={classes.modal}>
			<DialogTitle>Ask a Card</DialogTitle>
			<DialogContent dividers>
				<p className={classes.p}>Select order</p>
				<Tabs
					value={order}
					onChange={(e, newVal) => setOrder(newVal)}
					centered
				>
					{availableOrders.map((order) => {
						return (
							<Tab
								key={order.value}
								label={order.name}
								value={order.value}
								disabled={!order.present}
							/>
						)
					})}
				</Tabs>
				<p className={classes.p}>Select suit</p>
				<Tabs
					variant={
						availableSuits.length === 4 ? 'scrollable' : 'standard'
					}
					value={suit}
					onChange={(e, newVal) => setSuit(newVal)}
					centered={availableSuits.length < 4}
				>
					{availableSuits.map((suit) => {
						return (
							<Tab
								key={suit.value}
								label={suit.name}
								value={suit.value}
								disabled={!suit.present}
							/>
						)
					})}
				</Tabs>
				<p className={classes.p}>Select Opponent</p>
				<Tabs
					variant="scrollable"
					value={selectedOpponent}
					onChange={(e, newVal) => setselectedOpponent(newVal)}
				>
					{opponents.map((opponent) => (
						<Tab
							key={opponent.position}
							value={opponent.position}
							label={opponent.name}
						></Tab>
					))}
				</Tabs>
				<p className={classes.p}>Select card</p>
				<DisplayCards
					classes={classes}
					cards={cards}
					onCardClick={assign}
					isCardOpaque={() => {
						return true
					}}
				/>
			</DialogContent>
			<DialogActions>
				<Grid
					container
					item
					spacing={0}
					direction="column"
					alignItems="flex-start"
					justify="flex-start"
				>
					<Collapse in={errorOpen}>
						<Alert severity="error">
							{errorMessage ? errorMessage : ''}
						</Alert>
					</Collapse>
				</Grid>
				<Button
					variant="contained"
					color="secondary"
					onClick={handleModalClose}
				>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AskCard
