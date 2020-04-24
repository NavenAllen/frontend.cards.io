import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { useStyles } from './styles'

export const Instructions = (props) => {
	const classes = useStyles()
	return (
		<Paper className={classes.root}>
			<Typography
				align={'center'}
				component={'h2'}
				variant={'h4'}
				paragraph
			>
				<b>Literature Rules</b>
			</Typography>
			<Paper className={classes.card}>
				<Typography component={'h2'} variant={'h5'} paragraph>
					<b>Players and Cards</b>
				</Typography>
				<Typography component={'p'} variant={'p'} paragraph>
					The best game is for six players in two teams of three. It
					is also possible for eight to play, four against four.
				</Typography>
				<Typography component={'p'} variant={'p'} paragraph>
					The four 8's are removed from a standard 52-card deck,
					leaving 48 cards, which form eight <b>half-suits</b>, also
					known as <b>sets</b> or <b>books</b>. Each suit is divided
					into a half-suit of <b>low</b> or <b>minor</b> cards:{' '}
					<b>2-3-4-5-6-7</b> and a half-suit of <b>high</b> or{' '}
					<b>major</b> cards: <b>9-10-J-Q-K-A</b>. The objective is,
					as a team, to collect and claim as many as possible of these
					half-suits.
				</Typography>
				<Typography component={'p'} variant={'p'} paragraph>
					The best game is for six players in two teams of three. It
					is also possible for eight to play, four against four.
				</Typography>
			</Paper>
			<Paper className={classes.card}>
				<Typography component={'h2'} variant={'h5'} paragraph>
					<b>Deal</b>
				</Typography>
				<Typography component={'p'} variant={'p'} paragraph>
					A dealer is chosen at random, for example by drawing cards.
					This player thoroughly shuffles the deck and deals out all
					the cards one at a time face down, so that in a six-player
					game each player has 8 cards, and in an eight player game 6
					cards. If any card is exposed, it is a misdeal, and the
					dealer re-shuffles and re-deals.
				</Typography>
				<Typography component={'p'} variant={'p'} paragraph>
					Once all the cards have been dealt, players may look at
					their cards, but they are not allowed to show any of their
					cards to anyone else (especially not to their teammates).
				</Typography>
			</Paper>
			<Paper className={classes.card}>
				<Typography component={'h2'} variant={'h5'} paragraph>
					<b>Play</b>
				</Typography>
				<Typography component={'h2'} variant={'h6'}>
					Questions
				</Typography>
				<Typography component={'p'} variant={'p'} paragraph>
					<p>
						When it is your turn, you must ask any one specific
						player <b>from the other team</b> a valid question. A
						question is valid if and only if it meets the following
						criteria:
					</p>
					<ol type="a">
						<li>
							You must ask for a specific card (by value and
							suit).
						</li>
						<li>
							You must have another card in that half-suit in your
							hand.
						</li>
						<li>The player you ask must hold at least one card.</li>
						<li>
							You must not ask for a card that is in your own hand
						</li>
					</ol>
					<p>
						<b>Example:</b> If the only spade in your hand is the
						Queen of Spades, you may ask for the 9, 10, Jack, King
						or Ace of Spades. You may not ask for the Queen of
						Spades, nor may you ask for a low spade.
					</p>
					<p>
						If the player you ask has the card in question, he or
						she must pass it to you face-up, and you take the card
						into your hand. You then keep the turn and must ask
						another question (though you do not have to ask the same
						player).
					</p>
					<p>
						You may <b>never</b> ask a teammate if he or she has a
						certain card.
					</p>
				</Typography>
				<Typography component={'h2'} variant={'h6'}>
					Claiming
				</Typography>
				<Typography component={'p'} variant={'p'} paragraph>
					<p>
						If, at your turn, you have all six cards of a half-suit
						in your hand, you may claim the half-suit by laying the
						cards down face-up to show everyone. Your team gets that
						half-suit.
					</p>
					<p>
						In addition, if you believe that, between you and your
						teammates, your team possesses an entire half-suit, you
						may claim it in your turn by saying "Claim" and then
						naming exactly who has which cards in the half-suit. If
						you do so correctly, your team gets the half-suit. If
						your team has the half suit, but you state the location
						of one or more cards wrongly, the half-suit is cancelled
						and neither team gets it. If any member of the opposing
						team has a card in the half-suit you try to claim, the
						opposing team gets the half-suit.
					</p>
					<p>
						After any half-suit has been claimed, the players
						holding cards of that half-suit show them, to prove
						whether the claim was correct or not. The six cards are
						stacked in front of a member of the winning team, and
						the game continues with the remaining cards.
					</p>
				</Typography>
				<Typography component={'h2'} variant={'h6'}>
					Public information
				</Typography>
				<Typography component={'p'} variant={'p'} paragraph>
					<p>
						Any player may ask at any time what the last question
						was, who asked it, and what the answer was. Any question
						prior to that is called "History," and may not be
						discussed.
					</p>
					<p>
						Any player may ask at any time how many cards another
						player, including a teammate, has in his or her hand and
						the player must answer truthfully.
					</p>
					<p>
						Paper, writing implements, or other devices used to
						record information about the state of the game aside
						from one's own brain and memory skills are not allowed.
					</p>
				</Typography>
				<Typography component={'h2'} variant={'h6'}>
					Endgame
				</Typography>
				<Typography component={'p'} variant={'p'} paragraph>
					<p>
						As the game progresses players will run out of cards,
						either because an opponent successfully asks for their
						last card or because all their remaining cards belong to
						a half-suit that is claimed. A player who has no cards
						cannot be asked for a card, so the turn cannot be given
						to them.
					</p>
					<p>
						It is possible to lose all your remaining cards while it
						is your turn as a result of a claim. In this case you
						pass the turn to another member of your team who still
						has cards. In the event that more than one player in
						your team has cards, you choose which of your teammates
						gets the turn.
					</p>
					<p>
						When one team runs out of cards entirely, no more
						questions may be asked. The team with all the remaining
						cards must then try to claim out all remaining
						half-suits. If the turn is with the team that has cards,
						the player whose turn it is must claim all the remaining
						sets, without consulting his partners. If the turn is
						with the team that has run out of cards, the player
						whose turn it is chooses which member of the other team
						must make the final claims; the player chosen must have
						at least one card.
					</p>
				</Typography>
				<Typography component={'h2'} variant={'h6'}>
					Irregularities and Procedure
				</Typography>
				<Typography component={'p'} variant={'p'} paragraph>
					<p>
						If a player discovers that he or she has asked an
						invalid question or failed to hand over a card he or she
						was asked for, he or she should alert all players, who,
						as a group, will determine how best to resolve the
						situation (either by throwing in that half-suit, giving
						the card to someone on the other team, etc.).
					</p>
					<p>
						The penalty for claiming when it is not your turn is
						that the half-suit is cancelled if the claimer's team
						has it all, or awarded to the opponents if they have any
						of the cards.
					</p>
					<p>
						Similarly, if you see a card in a teammate's hand, try
						to play as if you did not, but, if the information you
						inadvertantly gained cannot help but affect your play,
						alert the other players to come to a fair solution.
					</p>
					<p>
						If a player needs time to process information or to work
						out a potential claim, he or she may call "Wait" or
						"Stop" at any time. Play should pause until that player
						indicates that he or she is ready to continue. However,
						this courtesy should not be abused or used solely to
						break the pace of play or as an attempt to make others
						forget information.
					</p>
				</Typography>
			</Paper>
		</Paper>
	)
}
