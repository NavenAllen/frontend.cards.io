import React from 'react'
import { Tab, Tabs } from '@material-ui/core'

export const Suits = ({ suit, setSuit, classes }) => {
	return (
		<Tabs
			value={suit}
			classes={{
				flexContainer: classes.tabs
			}}
			onChange={(e, newVal) => setSuit(newVal)}
		>
			<Tab value={'C'} label="Clubs"></Tab>
			<Tab value={'H'} label="Hearts"></Tab>
			<Tab value={'D'} label="Diamonds"></Tab>
			<Tab value={'S'} label="Spades"></Tab>
		</Tabs>
	)
}
