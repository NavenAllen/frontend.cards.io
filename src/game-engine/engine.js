import React, {useState} from 'react';

import Deck from './components/Deck/Deck'
import Game from './components/Game/Game'

export const Engine = props => {
    const [num_players, set_num_players] = useState(4)
    const [dealt, setDealt] = useState(false)
    const [folded, setFolded] = useState(false)
    const deck = new Deck(props.deck);
    const _ = [];
    for (let i=0; i<num_players; i++)
        _.push([]);
    const [players, setPlayers] = useState(_)

    const deal = cards_per_user => {
        if (dealt) return;
        deck.shuffle();
        let total_cards = cards_per_user * num_players;
        let new_players = Array.from(players)
        while (total_cards--) {
            new_players[total_cards % num_players].push(deck.deal())
        }
        setPlayers(new_players)
        setDealt(true)
    }

    const fold = () => {
        console.log('h')
        setFolded(prev => !prev);
    }
    return (
        {
            game: <Game dealt={dealt} players={players} num_players={num_players} folded={folded} />,
            deal,
            fold
        }
    )
}