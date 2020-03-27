import React from 'react';
import './Deck.module.css';
import Card from '../Card/Card.js';

class CardDeck extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
        const card={
            num: 'B',
            shape: 'S',
        }
        return(
           <Card side="back"></Card>
        )
    }
}
export default CardDeck