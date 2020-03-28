import React, {useState, useEffect} from 'react';
import Card from '../Card/Card.js';

import classes from './Hand.module.css';

const Hand = (props) => {
    sort(props.cards);
    const defaultCardStyle = {
        num: '',
        shape: '',
    };
    const [hover, setHover] = useState(false);
    useEffect(() => {
        if (!props.folded) setHover(false);
    }, [props.folded]);
    const [style, setStyle] = useState({});
    const cards = Math.floor(props.cards.length / 2);
    const [cardStyle, setCardStyle] = useState(defaultCardStyle);
    const transfer_card = (card, card_index) => {
        let dest = parseInt(prompt('To which deck you want to transfer, enter index'));
        let sour = parseInt(props.index);
        if (sour === dest) {
            alert('Source cannot be same as destination');
            return;
        }
        let source = document.querySelector(`.${classes.hand}:nth-of-type(${sour + 1})`);
        let destination = document.querySelector(`.${classes.hand}:nth-of-type(${dest + 1})`);
        let d = destination.getBoundingClientRect();
        let s = source.getBoundingClientRect();
        setCardStyle(card);
        setStyle({
            top: s.y,
            left: s.x,
            position: 'fixed',
            transition: 'none',
        });
        setTimeout(() => {
            destination.style.zIndex = -1;
            setStyle({
                top: d.y,
                left: !props.folded ? d.x + destination.childElementCount * 30 : d.x,
                transform: !props.folded
                    ? `rotate(${(destination.childElementCount - cards) * 10}deg)`
                    : `rotate(${(destination.childElementCount - cards) * 3}deg)`,
                position: 'fixed',
                zIndex: 1,
                transition: '1s',
            });
            setTimeout(() => {
                props.transfer_card(sour, dest, card_index);
                setCardStyle(defaultCardStyle);
                destination.style.zIndex = 0;
            }, 1000);
        }, 100);
    };
    return (
        <>
            <ul
                className={classes.hand}
                style={props.style}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
                {props.cards.map((card, index) => (
                    <Card
                        transfer_card={props.transfer_card}
                        folded={props.folded}
                        value={card}
                        key={card.shape + card.num}
                        index={index}
                        hover={hover}
                        onClick={() => transfer_card(card, index)}
                        cards={cards}
                        style={cardStyle.shape === card.shape && cardStyle.num === card.num ? style : {}}
                    />
                ))}
            </ul>
        </>
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
