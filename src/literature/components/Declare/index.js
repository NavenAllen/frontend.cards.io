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

import classes from './Declare.module.css'
import { literatureGameActions } from '../../state/actions/game.actions'
import { useDispatch, useSelector } from 'react-redux'
import { Friends } from './components/Friends'
import DisplayCards from './components/DisplayCards'
import * as LiteratureConstants from '../../constants'

const Declare = ({
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
	const friends = game.players.filter(
		(player) =>
			player.position !== user.position &&
			player.position % 2 === user.position % 2
	)
	const [selectedFriend, setselectedFriend] = useState(friends[0].position)

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
			let jokerCount = 0,
				jokerColors = ['R', 'B']
			userCards.forEach((card) => {
				if (card === 'JOKER') jokerCount++
			})
			for (let i = jokerCount; i < 2; i++)
				ret.push({
					value: jokerColors[i - jokerCount] + 'JOKER',
					assignedTo: ''
				})
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
		let prev = cards.map((item) => {
			if (card.value === item.value) item.assignedTo = selectedFriend
			return item
		})
		setCards(prev)
	}

	const isCardOpaque = (card) => {
		return card.assignedTo === selectedFriend
	}

	const handleModalClose = useCallback(() => {
		setPreviousOptions({
			...previousOptions,
			suit,
			order
		})
		handleClose()
	}, [suit, order, previousOptions, setPreviousOptions, handleClose])

	const declare = useCallback(() => {
		const nums = [
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'9',
			'10',
			'J',
			'Q',
			'K',
			'A'
		]
		if (cards.some((card) => card.assignedTo === '')) {
			setErrorMessage('Assign each card to a player')
			setErrorOpen(true)
			return
		} else {
			let declaration = []
			for (let i = 0; i < game.players.length / 2; i++)
				declaration.push([])
			if (order !== 2)
				for (let i = order * 6; i < order * 6 + 6; i++) {
					if (userCards.indexOf(nums[i] + suit) !== -1)
						cards.push({
							value: nums[i] + suit,
							assignedTo: user.position
						})
				}
			else {
				let suits = ['H', 'C', 'D', 'S']
				suits.forEach((suit) => {
					if (userCards.indexOf('8' + suit) !== -1)
						cards.push({
							value: '8' + suit,
							assignedTo: user.position
						})
				})
				let jokerCount = 0
				userCards.forEach((card) => {
					if (card === 'JOKER') jokerCount++
				})
				for (let i = 0; i < jokerCount; i++)
					cards.push({
						value: 'JOKER',
						assignedTo: user.position
					})
				cards.forEach((card) => {
					if (card.value.includes('JOKER')) card.value = 'JOKER'
				})
			}
			cards.sort((a, b) => a.assignedTo - b.assignedTo)
			for (let i = 0; i < cards.length; i++) {
				let declarePos =
					Math.floor(cards[i].assignedTo / 2) +
					(cards[i].assignedTo % 2) -
					1
				declaration[declarePos].push(cards[i].value)
			}
			dispatch(
				literatureGameActions.playDeclare({
					code: game.code,
					pid: user.id,
					declaration
				})
			)
			handleModalClose()
		}
	}, [
		dispatch,
		cards,
		order,
		suit,
		game.code,
		game.players.length,
		userCards,
		user.position,
		user.id,
		handleModalClose
	])

	return (
		<Dialog open={open} onExit={handleClose} className={classes.modal}>
			<DialogTitle>Declare cards</DialogTitle>
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
				<p className={classes.p}>Select friend</p>
				<Friends
					selectedFriend={selectedFriend}
					setselectedFriend={setselectedFriend}
					classes={classes}
					friends={friends}
				/>
				<p className={classes.p}>Select cards</p>
				<DisplayCards
					classes={classes}
					cards={cards}
					isCardOpaque={isCardOpaque}
					onCardClick={assign}
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
				<Button
					disabled={locked}
					color="primary"
					variant="contained"
					onClick={declare}
				>
					Declare
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default Declare
