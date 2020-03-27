import React, { useState, useEffect } from 'react';
import Card from '../Card/Card.js';

import classes from './Hand.module.css';

const Hand = (props) => {
    sort(props.cards);
    const [hover, setHover] = useState(false)
    useEffect(() => {
        if (props.folded) setHover(false)
    }, [props.folded])
    return (
        <ul className={classes.hand} style={props.style} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {props.cards.map((card, index) => (
                <Card folded={props.folded} value={card} index={index} key={index} hover={hover} />
            ))}
        </ul>
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
