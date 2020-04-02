import React, { useState } from 'react'
import Game from './components/Game/Game'

export const Engine = ({ otherPlayers, playerCards }) => {
	const [folded, setFolded] = useState(false)

	const fold = () => {
		setFolded((prev) => !prev)
	}
	return {
		game: (
			<Game
				players={otherPlayers}
				playerCards={playerCards}
				folded={folded}
				fold={fold}
			/>
		),
		fold
	}
}
