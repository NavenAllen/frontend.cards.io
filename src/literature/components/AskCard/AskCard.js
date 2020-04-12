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
		const lowerRanks = ['2', '3', '4', '5', '6', '7']
		userCards.forEach((card) => {
			let cardValue = card[0]
			let cardSuit = card[1]
			if (lowerRanks.indexOf(cardValue) !== -1)
				setAvailableOrders((previousOrders) => {
					return previousOrders.map((order) => {
						if (order.value === 0) order.present = true
						return order
					})
				})
			else
				setAvailableOrders((previousOrders) => {
					console.log(previousOrders)
					return previousOrders.map((order) => {
						if (order.value === 6) order.present = true
						return order
					})
				})
			setAvailableSuits((previousSuits) => {
				return previousSuits.map((suit) => {
					if (suit.value === cardSuit) suit.present = true
					return suit
				})
			})
		})
	}, [userCards])
	useEffect(() => {
		let ret = []
		for (let i = order; i < order + 6; i++) {
			if (userCards.indexOf(LiteratureConstants.ranks[i] + suit) === -1)
				ret.push({
					value: LiteratureConstants.ranks[i] + suit,
					assignedTo: ''
				})
		}
		ret = ret.filter((item) => userCards.indexOf(item.value) === -1)
		setCards(ret)
	}, [suit, order, userCards])
	const assign = (card) => {
		askCard(card.value)
	}
	const askCard = useCallback(
		(card) => {
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
		[dispatch, game.code, user.id, selectedOpponent, handleClose]
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
