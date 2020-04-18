import React from 'react'
import { Tab, Tabs } from '@material-ui/core'

export const Friends = ({
	setselectedFriend,
	selectedFriend,
	classes,
	friends
}) => {
	return (
		<Tabs
			variant="scrollable"
			value={selectedFriend}
			onChange={(e, newVal) => setselectedFriend(newVal)}
		>
			{friends.map((friend) => (
				<Tab
					value={friend.position}
					key={friend.position}
					label={friend.name}
				></Tab>
			))}
		</Tabs>
	)
}
