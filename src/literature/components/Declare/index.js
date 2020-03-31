import React, { useState, useEffect, useCallback } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button
} from '@material-ui/core'

import classes from './Declare.module.css'
import { literatureGameActions } from '../../state/actions/game.actions'
import { useDispatch, useSelector } from 'react-redux'
import { Friends } from './components/Friends'
import { DisplayCards } from './components/DisplayCards'
import { Suits } from './components/Suits'
import { Order } from './components/Order'

export const Declare = ({ open, handleClose }) => {
	const [suit, setSuit] = useState('H')
	const [cards, setCards] = useState([])
	const [order, setOrder] = useState(0)
	const dispatch = useDispatch()
	const userCards = useSelector((state) => state.playerData.hand)
	const locked = useSelector((state) => state.locked)
	const user = useSelector((state) => state.playerData)
	const game = useSelector((state) => state.gameData)
	const isEven = user.position % 2 == 0
	const friends = game.players.filter(
		(player) =>
			player.position !== user.position &&
			(player.position % 2 === 0) === isEven
	)
	const nums = ['2', '3', '4', '5', '6', '7', '9', '10', 'J', 'Q', 'K', 'A']
	const [selectedFriend, setselectedFriend] = useState(friends[0].position)
	useEffect(() => {
		let ret = []
		for (let i = order; i < order + 6; i++) {
			ret.push({
				num: nums[i],
				shape: suit,
				assignedTo: ''
			})
		}
		ret = ret.filter(
			(item) => userCards.indexOf(item.num + item.shape) === -1
		)
		setCards(ret)
	}, [suit, order])
	const assign = (card) => {
		let prev = cards.map((item) => {
			if (card.num === item.num && card.shape === item.shape)
				item.assignedTo = selectedFriend
			return item
		})
		setCards(prev)
	}
	const declare = useCallback(() => {
		if (cards.some((card) => card.assignedTo === '')) return
		else {
			let declaration = [[]]
			let last_num,
				j = 0
			cards.sort((a, b) => a.assignedTo - b.assignedTo)
			last_num = parseInt(cards[0].assignedTo)
			declaration[j].push(cards[0].num + cards[0].shape)
			for (let i = 1; i < cards.length; i++) {
				if (parseInt(cards[i].assignedTo) !== last_num) {
					declaration.push([])
					j++
					last_num = parseInt(cards[i].assignedTo)
				}
				declaration[j].push(cards[i].num + cards[i].shape)
			}
			dispatch(
				literatureGameActions.playDeclare({
					code: game.gameCode,
					fid: user.playerId,
					declaration
				})
			)
		}
	}, [dispatch])

	return (
		<Dialog
			open={open}
			onHide={handleClose}
			dialogClassName={classes.modal}
		>
			<DialogTitle>Declare cards</DialogTitle>
			<DialogContent>
				<p className={classes.p}>Select friend</p>
				<Friends
					selectedFriend={selectedFriend}
					setselectedFriend={setselectedFriend}
					classes={classes}
					friends={friends}
				/>
				<p className={classes.p}>Select order</p>
				<Order order={order} setOrder={setOrder} classes={classes} />
				<p className={classes.p}>Select suit</p>
				<Suits classes={classes} suit={suit} setSuit={setSuit} />
				<p className={classes.p}>Select cards</p>
				<DisplayCards classes={classes} cards={cards} assign={assign} />
			</DialogContent>
			<DialogActions>
				<Button variant="secondary" onClick={handleClose}>
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
