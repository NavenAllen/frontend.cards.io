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
    const side=props.side;
    // if(side=='front')
    // {
        const value = props.value.num === '0' ? '10' : props.value.num;
        const suit = {
            C: '♣',
            D: '♦',
            H: '♥',
            S: '♠',
        }[props.value.shape];
        const cardColor = suit === '♥' || suit === '♦' || suit === '♡' || suit === '♢' ? {color: 'red'} : {color: 'black'};
    // }

    return (
        <div>
            {(side == 'front')?(
            <div id={value + suit} className={classes.card_container} style={{...cardColor, ...props.style}}>
                <div style={left}>{value}</div>
                <div style={leftSuit}>{suit}</div>
                <CardColumn order="1" value={value} suit={suit} />
                <CardColumn order="2" value={value} suit={suit} />
                <CardColumn order="3" value={value} suit={suit} />
                <div style={rightSuit}>{suit}</div>
                <div style={right}>{value}</div>
            </div>
            ): (<div>deck</div>)}
        </div>
        
    );
};

export default Card;
