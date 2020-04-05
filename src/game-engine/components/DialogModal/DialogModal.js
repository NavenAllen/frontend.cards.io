import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {}
}))

const DialogModal = (props) => {
	const classes = useStyles()

	const { open, title, content, actionButtons, handleClose } = props

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="dialog-title"
		>
			<DialogTitle id="dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{content}</DialogContentText>
			</DialogContent>
			<DialogActions>
				{actionButtons.map((button) => button)}
			</DialogActions>
		</Dialog>
	)
}

DialogModal.propTypes = {
	open: PropTypes.bool.isRequired,
	title: PropTypes.string,
	content: PropTypes.string,
	actionButtons: PropTypes.array,
	handleClose: PropTypes.func
}

export default DialogModal
