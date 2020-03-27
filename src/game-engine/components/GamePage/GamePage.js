import React from 'react';
import './GamePage.css';
import Deck from '../Deck';
import Hand from '../Hand/Hand';

class GamePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        const deck1 = new Deck();
        deck1.shuffle();
        const cards = [deck1.deal(), deck1.deal(), deck1.deal(), deck1.deal(), deck1.deal(), deck1.deal()];
        return (
            <div class="playerCards">
                {/* <CardDeck></CardDeck> */}
                <Hand cards={cards} />
                {/* <Hand cards={cards} />
                <Hand cards={cards} />
                <Hand cards={cards} /> */}
            </div>
        );
    }
}
export default GamePage