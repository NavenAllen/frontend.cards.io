import React from 'react';
import CardColumn from '../CardColumn/CardColumn.js';
import classes from './Card.module.css';

const left = {
    gridColumn: '1',
    gridRow: '1',
};

const leftSuit = {
    gridColumn: '1',
    gridRow: '2',
};

const right = {
    gridColumn: '5',
    gridRow: '13',
    transform: `rotate(-180deg)`,
    translateX: `(-8px)`,
};

const rightSuit = {
    gridColumn: '5',
    gridRow: '12',
    transform: `rotate(-180deg)`,
    translateX: `(-8px)`,
};

export const Card = (props) => {
    const value = props.value.num === '0' ? '10' : props.value.num;
    const suit = {
        C: '♣',
        D: '♦',
        H: '♥',
        S: '♠',
    }[props.value.shape];
    const cardColor = suit === '♥' || suit === '♦' || suit === '♡' || suit === '♢' ? {color: 'red'} : {color: 'black'};
    let folded = {position: 'absolute'};
    if (!props.folded) {
        folded = {
            ...folded,
            left: props.index * 30,
            transform: `rotate(${(props.index - props.cards) * 10}deg)`,
        };
    } else {
        folded = {
            ...folded,
            transform: `rotate(${(props.index - props.cards) * 3}deg)`,
        };
    }
    if (props.hover) {
        folded = {
            ...folded,
            transform: `rotate(${(props.index - props.cards) * 10}deg)`,
            left: props.index * 30,
        };
    }
    return (
        <>
            <li
                onClick={props.onClick}
                id={value + suit}
                className={classes.card_container}
                style={{...cardColor, ...folded, ...props.style}}>
                <div style={left}>{value}</div>
                <div style={leftSuit}>{suit}</div>
                <CardColumn order="1" value={value} suit={suit} />
                <CardColumn order="2" value={value} suit={suit} />
                <CardColumn order="3" value={value} suit={suit} />
                <div style={rightSuit}>{suit}</div>
                <div style={right}>{value}</div>
            </li>
        </>
    );
};

export default Card;
