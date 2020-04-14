import React, { useState, useCallback } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	FormControl,
	Select,
	MenuItem
} from '@material-ui/core'

import classes from './Transfer.module.css'
import { literatureGameActions } from '../../state/actions/game.actions'
import { useDispatch, useSelector } from 'react-redux'

const Transfer = ({ open, handleClose }) => {
	const dispatch = useDispatch()
	const locked = useSelector((state) => state.locked)
	const user = useSelector((state) => state.playerData)
	const game = useSelector((state) => state.gameData)
	const friends = game.players.filter(
		(player) =>
			player.position !== user.position &&
			player.position % 2 === user.position % 2
	)
	const [selectedFriend, setselectedFriend] = useState(friends[0].position)

	const handleSelectedFriendChange = (event) => {
		setselectedFriend(event.target.value)
	}
	const transfer = useCallback(() => {
		dispatch(
			literatureGameActions.playTransfer({
				code: game.code,
				fid: user.id,
				tpos: selectedFriend
			})
		)
		handleClose()
	}, [dispatch, game.code, user.id, selectedFriend, handleClose])

	return (
		<Dialog open={open} onExit={handleClose} className={classes.modal}>
			<DialogTitle>Transfer Turn</DialogTitle>
			<DialogContent dividers>
				<p className={classes.p}>Select player</p>
				<FormControl variant="outlined" className={classes.formControl}>
					<Select
						value={selectedFriend}
						onChange={handleSelectedFriendChange}
					>
						{friends.map((friend) => {
							return (
								<MenuItem value={friend.position}>
									{friend.name}
								</MenuItem>
							)
						})}
					</Select>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					color="secondary"
					onClick={handleClose}
				>
					Close
				</Button>
				<Button
					disabled={locked}
					color="primary"
					variant="contained"
					onClick={transfer}
				>
					Transfer
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default Transfer
