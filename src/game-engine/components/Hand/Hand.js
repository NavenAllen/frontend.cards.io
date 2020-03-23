import React from 'react';
import Card from '../Card/Card.js';

import classes from './Hand.module.css';

const get_angle = (index, num_cards) => {
    const single = Math.ceil(120 / num_cards);
    if (num_cards % 2 === 0) {
        if (index < num_cards / 2)
            return {
                transform: `translate(
                    ${num_cards * 10 * (num_cards / 2 - index - 1)}px, 
                    ${num_cards * 2 * (num_cards / 2 - index - 1)}px
                    ) 
                    rotate(-${(num_cards / 2 - index - 1) * single}deg)`
            };
        return {
            transform: `translate(
                ${-num_cards * 10 * (index + 1 - num_cards / 2)}px,
                ${num_cards * 2 * (index - num_cards / 2)}px
                )
                rotate(${(index - num_cards / 2) * single}deg)`,
        };
    }
    if (index < num_cards / 2)
        return {
            transform: `rotate(-${(num_cards / 2 - index - 1) * single}deg)`,
            left: num_cards * 10 * (num_cards / 2 - index - 1),
            top: num_cards * 2 * (num_cards / 2 - index - 1),
        };
    return {
        transform: `rotate(${(index - num_cards / 2) * single}deg)`,
        left: -num_cards * 10 * (index + 1 - num_cards / 2),
        top: num_cards * 2 * (index + 1 - num_cards / 2),
    };
};

const Hand = (props) => {
    sort(props.cards);
    const num_cards = props.cards.length;
    return (
        <div className={classes.hand_container}>
            <div className={classes.hand_cards_container}>
                {props.cards.map((card, index) => (
                    <Card value={card} style={get_angle(index, num_cards)} />
                ))}
            </div>
        </div>
    );
};

function sort(hand) {
    const temp = hand.toString();
    const ace_hi = temp.includes('A')
        ? temp.includes('2') && temp.includes('3') && temp.includes('4') && temp.includes('5')
            ? false
            : true
        : true;
    const weights = {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '0': 10,
        J: 11,
        Q: 12,
        K: 13,
        A: ace_hi ? 14 : 1,
    };
    hand.sort((a, b) => {
        return weights[a[0]] - weights[b[0]];
    });
}

export default Hand;
