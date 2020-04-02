import React from 'react'
import Hand from '../Hand/Hand'
import classes from './Game.module.css'

const Game = ({ players, playerCards, folded, fold }) => {
	let num_players = players.length
	if (num_players === 3) num_players = 1
	else if (num_players === 4) num_players = 2
	else num_players = 3
	return (
		<>
			<Hand
				folded={folded}
				cards={playerCards}
				fold={fold}
				hide={false}
			/>
			<div className={`${classes.handrow} ${classes.upperhand}`}>
				{players.slice(0, num_players).map((player, index) => (
					<Hand
						folded={true}
						cards={players[index]}
						fold={fold}
						key={player.name}
						otherPlayers={players}
						hide={true}
					/>
				))}
			</div>
			<div className={`${classes.handrow} ${classes.midhand}`}>
				{players
					.slice(num_players, num_players + 2)
					.map((player, index) => (
						<Hand
							folded={true}
							cards={players[index]}
							fold={fold}
							key={player.name}
							otherPlayers={players}
							hide={true}
						/>
					))}
			</div>
			<div className={`${classes.handrow} ${classes.lowerhand}`}>
				{players
					.slice(num_players + 2, num_players + 4)
					.map((player, index) => (
						<Hand
							folded={true}
							cards={players[index]}
							fold={fold}
							key={player.name}
							otherPlayers={players}
							hide={true}
						/>
					))}
			</div>
		</>
	)
}

export default Game
