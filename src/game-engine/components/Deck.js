class Deck {
    constructor(cards) {
        this.deck = cards || [
            {
                num: 'A',
                shape: 'S',
            },
            {
                num: 'A',
                shape: 'H',
            },
            {
                num: 'A',
                shape: 'D',
            },
            {
                num: 'A',
                shape: 'C',
            },
            {
                num: '2',
                shape: 'S',
            },
            {
                num: '2',
                shape: 'H',
            },
            {
                num: '2',
                shape: 'D',
            },
            {
                num: '2',
                shape: 'C',
            },
            {
                num: '3',
                shape: 'S',
            },
            {
                num: '3',
                shape: 'H',
            },
            {
                num: '3',
                shape: 'D',
            },
            {
                num: '3',
                shape: 'C',
            },
            {
                num: '4',
                shape: 'S',
            },
            {
                num: '4',
                shape: 'H',
            },
            {
                num: '4',
                shape: 'D',
            },
            {
                num: '4',
                shape: 'C',
            },
            {
                num: '5',
                shape: 'S',
            },
            {
                num: '5',
                shape: 'H',
            },
            {
                num: '5',
                shape: 'D',
            },
            {
                num: '5',
                shape: 'C',
            },
            {
                num: '6',
                shape: 'S',
            },
            {
                num: '6',
                shape: 'H',
            },
            {
                num: '6',
                shape: 'D',
            },
            {
                num: '6',
                shape: 'C',
            },
            {
                num: '7',
                shape: 'S',
            },
            {
                num: '7',
                shape: 'H',
            },
            {
                num: '7',
                shape: 'D',
            },
            {
                num: '7',
                shape: 'C',
            },
            {
                num: '8',
                shape: 'S',
            },
            {
                num: '8',
                shape: 'H',
            },
            {
                num: '8',
                shape: 'D',
            },
            {
                num: '8',
                shape: 'C',
            },
            {
                num: '9',
                shape: 'S',
            },
            {
                num: '9',
                shape: 'H',
            },
            {
                num: '9',
                shape: 'D',
            },
            {
                num: '9',
                shape: 'C',
            },
            {
                num: 'J',
                shape: 'S',
            },
            {
                num: 'J',
                shape: 'H',
            },
            {
                num: 'J',
                shape: 'D',
            },
            {
                num: 'J',
                shape: 'C',
            },
            {
                num: 'Q',
                shape: 'S',
            },
            {
                num: 'Q',
                shape: 'H',
            },
            {
                num: 'Q',
                shape: 'D',
            },
            {
                num: 'Q',
                shape: 'C',
            },
            {
                num: 'K',
                shape: 'S',
            },
            {
                num: 'K',
                shape: 'H',
            },
            {
                num: 'K',
                shape: 'D',
            },
            {
                num: 'K',
                shape: 'C',
            },
        ];
    }

    deal() {
        return this.deck.pop();
    }

    shuffle() {
        for (let i = 0; i < this.deck.length; i++) {
            // 1. Select a random card from the deck
            const offset = Math.floor(Math.random() * this.deck.length);
            const temp = this.deck[offset];
            // 2. remove the card from the deck
            this.deck.splice(offset, 1);
            // 3. place the card on the top of the deck
            this.deck.push(temp);
            // 4. every 3rd shuffle, reverse the deck
            if (i % 3 === 0) this.deck.reverse();
        }
    }
}

export default Deck;
