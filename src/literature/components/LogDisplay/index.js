import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	List,
	ListItemText,
	Divider
} from '@material-ui/core'

import { useSelector } from 'react-redux'
import logParser from '../../util/logParser'

const LogDisplay = ({ open, handleClose }) => {
	const gameLogs = useSelector((state) => state.gameData.logs)

	return (
		<Dialog
			open={open}
			onExit={handleClose}
			maxWidth="sm"
			fullWidth
			scroll="paper"
		>
			<DialogTitle>Previous logs</DialogTitle>
			<DialogContent dividers>
				<List>
					{gameLogs.reverse().map((log) => {
						let parsedLog = logParser(log)
						return (
							<>
								<ListItemText
									primary={parsedLog.message}
									secondary={parsedLog.title}
								/>
								<Divider />
							</>
						)
					})}
				</List>
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

export default LogDisplay
