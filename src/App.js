import React from 'react';
import './App.css';
import Deck from './game-engine/components/Deck';
import Hand from './game-engine/components/Hand/Hand';

const App = props => {
    const deck1 = new Deck();
    deck1.shuffle();
    const cards = [deck1.deal(), deck1.deal(), deck1.deal(), deck1.deal(), deck1.deal(), deck1.deal()];
    return (
        <div>
            <Hand cards={cards} />
            <Hand cards={cards} />
            <Hand cards={cards} />
            <Hand cards={cards} />
        </div>
    );
};

export default App;
