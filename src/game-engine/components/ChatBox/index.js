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
import MinimizeIcon from '@material-ui/icons/Minimize'
import { useSelector, useDispatch } from 'react-redux'
import { gameActions } from '../../state/actions/game.actions'
import styles from './style.module.css'

export const ChatBox = () => {
	const [openChat, setOpenChat] = useState(true)
	const box = useRef()
	const message = useRef()
	const dispatch = useDispatch()
	const user = useSelector((state) => state.playerData)
	const chat = useSelector((state) => state.chats)
	const game = useSelector((state) => state.gameData)
	const [chatLen, setChatLen] = useState(0)
	useEffect(() => {
		box.current.scrollIntoView()
		if (openChat) setChatLen(chat.length)
	}, [chat])
	useEffect(() => {
		if (openChat) setChatLen(chat.length)
	}, [openChat])
	const send = (e) => {
		e.preventDefault()
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
		<div className={styles.actionsFab}>
			<>
				<Collapse
					collapsedHeight={0}
					in={openChat}
					className={styles.collapseContainer}
				>
					<Paper className={styles.chatBox}>
						<header className={styles.chatHeader}>
							<span>Chat</span>
							<IconButton
								type="submit"
								className={styles.minimize}
								aria-label="search"
								onClick={() => setOpenChat(false)}
							>
								<MinimizeIcon />
							</IconButton>
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
								className={
									chat.length === 0 ? styles.noMessage : null
								}
								ref={box}
							>
								{chat.length === 0 &&
									'Send a message and get chatting!'}
							</small>
						</List>
						<div className={styles.textBoxContainer}>
							<form onSubmit={send}>
								<InputBase
									className={styles.textBox}
									placeholder="Send message..."
									inputProps={{
										'aria-label': 'Send message...'
									}}
									inputRef={message}
								/>
								<IconButton
									type="submit"
									className={styles.iconButton}
									aria-label="search"
									onClick={send}
								>
									<SendIcon />
								</IconButton>
							</form>
						</div>
					</Paper>
				</Collapse>
				<Fab
					variant="extended"
					color="primary"
					aria-label="add"
					onClick={() => setOpenChat((prev) => !prev)}
				>
					{chat.length - chatLen > 0 && (
						<span className={styles.unread}>
							{chat.length - chatLen}
						</span>
					)}
					<ChatIcon />
					{window.innerWidth > 600 && (
						<span style={{ marginLeft: 8 }}>CHAT</span>
					)}
				</Fab>
			</>
		</div>
	)
}
