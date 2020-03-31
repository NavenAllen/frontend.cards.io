import React from 'react'
import { Tab, Tabs } from '@material-ui/core'

export const Order = ({ order, setOrder, classes }) => {
	return (
		<Tabs
			value={order}
			classes={{
				flexContainer: classes.tabs
			}}
			onChange={(e, newVal) => setOrder(newVal)}
		>
			<Tab value={0} label="Lower"></Tab>
			<Tab value={6} label="Higher"></Tab>
		</Tabs>
	)
}
