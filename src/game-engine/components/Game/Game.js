import React from 'react'
import Hand from '../Hand/Hand'
import classes from './Game.module.css'

const Game = ({ players, playerCards, onCardClick, userPos }) => {
	let num_players = players.length
	if (num_players === 3) num_players = 1
	else if (num_players === 4) num_players = 2
	else num_players = 3
	return (
		<>
			<div className={`${classes.handrow} ${classes.upperhand}`}>
				{players.slice(0, num_players).map((player, index) => (
					<Hand
						position={player.position}
						folded={false}
						count={player.count}
						key={player.name}
						otherPlayers={players}
						hide={true}
						onCardClick={onCardClick}
					/>
				))}
			</div>
			<div className={`${classes.handrow} ${classes.midhand}`}>
				{players
					.slice(num_players, num_players + 2)
					.map((player, index) => (
						<Hand
							position={player.position}
							folded={false}
							count={player.count}
							key={player.name}
							otherPlayers={players}
							hide={true}
							onCardClick={onCardClick}
						/>
					))}
			</div>
			<div className={`${classes.handrow} ${classes.lowerhand}`}>
				{players
					.slice(num_players + 2, num_players + 4)
					.map((player, index) => (
						<Hand
							position={player.position}
							folded={false}
							count={player.count}
							key={player.name}
							otherPlayers={players}
							hide={true}
							onCardClick={onCardClick}
						/>
					))}
			</div>
			<div className={classes.userhand}>
				<Hand
					position={userPos}
					folded={false}
					cards={playerCards}
					hide={false}
					onCardClick={onCardClick}
				/>
			</div>
		</>
	)
}

export default Game
