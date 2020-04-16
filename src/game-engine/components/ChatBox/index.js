import React, { useState, useRef, useEffect } from 'react'
import {
	Fab,
	Paper,
	List,
	ListItem,
	ListItemText,
	InputBase,
	IconButton,
	Collapse
} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import SendIcon from '@material-ui/icons/Send'
import { useSelector, useDispatch } from 'react-redux'
import styles from './style.module.css'
import { gameActions } from '../../state/actions/game.actions'
import classes from './style.module.css'

const Chat = () => {
	const box = useRef()
	const message = useRef()
	const dispatch = useDispatch()
	const user = useSelector((state) => state.playerData)
	const chat = useSelector((state) => state.chats)
	const game = useSelector((state) => state.gameData)
	useEffect(() => {
		box.current.scrollIntoView()
	}, [chat])
	const send = () => {
		if (message.current.value === '') return
		dispatch(
			gameActions.sendChat({
				pid: user.id,
				code: game.code,
				message: message.current.value
			})
		)
		message.current.value = ''
	}
	return (
		<Paper className={styles.chatBox}>
			<header className={styles.chatHeader}>
				{/* {chat.length === 0
					? 'Send a message and get chatting!'
					: 'Chat'} */}
				Chat
			</header>
			<List className={styles.chat}>
				{chat.map((message, index) => (
					<ListItem className={styles.message}>
						<ListItemText
							classes={{ primary: styles.chatName }}
							className={`${styles.messageText} ${
								message.player.name === user.name &&
								styles.ownerMessageText
							}`}
							primary={message.player.name}
							secondary={message.message}
						/>
					</ListItem>
				))}
				<small
					className={chat.length === 0 ? styles.noMessage : null}
					ref={box}
				>
					{chat.length === 0 && 'Send a message and get chatting!'}
				</small>
			</List>
			<div className={styles.textBoxContainer}>
				<InputBase
					className={styles.textBox}
					placeholder="Send message..."
					inputProps={{ 'aria-label': 'Send message...' }}
					inputRef={message}
					onSubmit={send}
				/>
				<IconButton
					type="submit"
					className={styles.iconButton}
					aria-label="search"
					onClick={send}
				>
					<SendIcon />
				</IconButton>
			</div>
		</Paper>
	)
}

export const ChatBox = () => {
	const [openChat, setOpenChat] = useState(true)
	return (
		<div className={styles.actionsFab}>
			<>
				<Collapse
					collapsedHeight={0}
					in={openChat}
					className={styles.collapseContainer}
				>
					<Chat />
				</Collapse>
				<Fab
					variant="extended"
					color="primary"
					aria-label="add"
					onClick={() => setOpenChat((prev) => !prev)}
				>
					<ChatIcon />
					{window.innerWidth > 600 && (
						<span style={{ marginLeft: 8 }}>CHAT</span>
					)}
				</Fab>
			</>
		</div>
	)
}
