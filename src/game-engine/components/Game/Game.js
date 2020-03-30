import React from 'react'
import Hand from '../Hand/Hand'
import { positions } from './playerPositions'

const Game = ({ dealt, players, folded, transfer_card, fold }) => {
	const styles = positions[players.length]
	if (!dealt) return <div> Game not started </div>
	return players.map((player, index) => (
		<Hand
			folded={folded}
			style={styles[index]}
			cards={player}
			index={index}
			key={index}
			transfer_card={transfer_card}
			fold={fold}
		/>
	))
}

export default Game
