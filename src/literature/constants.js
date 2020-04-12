const orders = [
	{
		name: 'Lower',
		value: 0
	},
	{
		name: 'Higher',
		value: 1
	},
	{
		name: 'Jokers',
		value: 2
	}
]

const ranks = ['2', '3', '4', '5', '6', '7', '9', '10', 'J', 'Q', 'K', 'A']
const lowerRanks = ['2', '3', '4', '5', '6', '7']
const higherRanks = ['9', '10', 'J', 'Q', 'K', 'A']
const jokerRanks = ['8', 'JOKER']

const suits = [
	{
		name: 'Hearts',
		value: 'H'
	},
	{
		name: 'Clubs',
		value: 'C'
	},
	{
		name: 'Diamonds',
		value: 'D'
	},
	{
		name: 'Spades',
		value: 'S'
	}
]

const sets = {
	lower: [
		{
			name: 'Hearts',
			value: 'H'
		},
		{
			name: 'Clubs',
			value: 'C'
		},
		{
			name: 'Diamonds',
			value: 'D'
		},
		{
			name: 'Spades',
			value: 'S'
		}
	],
	higher: [
		{
			name: 'Hearts',
			value: 'H'
		},
		{
			name: 'Clubs',
			value: 'C'
		},
		{
			name: 'Diamonds',
			value: 'D'
		},
		{
			name: 'Spades',
			value: 'S'
		}
	],
	jokers: [
		{
			name: 'Jokers',
			value: 'JOK'
		}
	]
}

export { orders, ranks, lowerRanks, higherRanks, jokerRanks, suits, sets }
