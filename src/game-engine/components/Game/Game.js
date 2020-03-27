import React from 'react'
import Hand from '../Hand/Hand'

const Game = ({dealt, players, folded}) => {
    const styles = [
        {
            left: 100,
            top: 0
        },
        {
            left: 100,
            bottom: 0
        },
        {
            right: 100,
            top: 0
        },
        {
            right: 100,
            bottom: 0
        },
    ]
    if (!dealt) 
        return (
            <div> Game not started </div>
        )
    return (
        players.map((player, index) => (
            <Hand folded={folded} style={styles[index]} cards={player} index={index} key={index} />
        ))
    )
}

export default Game;