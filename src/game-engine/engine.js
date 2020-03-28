import React, {useState} from 'react';

import Deck from './components/Deck/Deck';
import Game from './components/Game/Game';

export const Engine = (props) => {
    const [num_players, set_num_players] = useState(4);
    const [dealt, setDealt] = useState(false);
    const [folded, setFolded] = useState(true);
    const deck = new Deck(props.deck);
    const _ = [];
    for (let i = 0; i < num_players; i++) _.push([]);
    const [players, setPlayers] = useState(_);

    const deal = (cards_per_user) => {
        if (dealt) return;
        deck.shuffle();
        let total_cards = cards_per_user * num_players;
        let new_players = Array.from(players);
        while (total_cards--) {
            new_players[total_cards % num_players].push(deck.deal());
        }
        setPlayers(new_players);
        setDealt(true);
    };

    const fold = () => {
        setFolded((prev) => !prev);
    };
    const transfer_card = (fromPlayerId, toPlayerId, card_index) => {
        let prev = Array.from(players);
        let card = prev[fromPlayerId].splice(card_index, 1)[0];
        prev[toPlayerId].push(card);
        setPlayers(prev);
    };
    return {
        game: (
            <Game
                dealt={dealt}
                players={players}
                num_players={num_players}
                folded={folded}
                transfer_card={transfer_card}
                fold={fold}
            />
        ),
        deal,
        fold,
        transfer_card,
    };
};
