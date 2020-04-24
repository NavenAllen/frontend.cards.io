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
			<Paper className={classes.innerCard}>
				<Typography component={'h2'} variant={'h6'} paragraph>
					Deal
				</Typography>
				<Typography paragraph>
					The best game is for eight players in two teams of four. It
					is also possible for six to play, three against three.
				</Typography>
				<Typography paragraph>
					The Jokers are added to a standard 52-card deck, resulting
					in 54 cards, which form 9 <b>half-suits</b>, also known as{' '}
					<b>sets</b> or <b>books</b>. Each suit is divided into a
					half-suit of <b>low</b> or <b>minor</b> cards:{' '}
					<b>2-3-4-5-6-7</b> and a half-suit of <b>high</b> or{' '}
					<b>major</b> cards: <b>9-10-J-Q-K-A</b> while the{' '}
					<b>Eights of each suit (4 in total)</b> and the{' '}
					<b>two Jokers</b> form a separate set. The objective is, as
					a team, to collect and claim as many as possible of these
					half-suits.
				</Typography>
				<Typography paragraph>
					Once all the cards have been dealt, players may look at
					their cards, but they are not allowed to show any of their
					cards to anyone else (especially not to their teammates).
				</Typography>
			</Paper>
			<Paper className={classes.innerCard}>
				<Typography component={'h2'} variant={'h6'}>
					Questions
				</Typography>
				<Typography paragraph>
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
						<b>Note:</b> The rule (d) does not apply to Joker, for
						which you can ask another Joker even if you already have
						one. However, you cannot ask for a Joker if you already
						have two.
					</p>
					<p>
						If the player you ask has the card in question, he or
						she passes it to you, and you take the card into your
						hand. You then keep the turn and must ask another
						question (though you do not have to ask the same
						player).
					</p>
					<p>
						You may <b>never</b> ask a teammate if he or she has a
						certain card.
					</p>
				</Typography>
			</Paper>
			<Paper className={classes.innerCard}>
				<Typography component={'h2'} variant={'h6'}>
					Declaring
				</Typography>
				<Typography paragraph>
					<p>
						If, at your turn, you have <b>all six cards</b> of a
						half-suit in your hand, you may claim the half-suit by
						choosing declare and clicking declare{' '}
						<b>without assigning cards</b> to your teammates. Your
						team gets that half-suit.
					</p>
					<p>
						In addition, if you believe that, between you and your
						teammates, your team possesses an <b>entire</b>{' '}
						half-suit, you may claim it in your turn by choosing to
						"Declare" and then <b>assigning exactly</b> who has
						which cards in the half-suit. If you do so correctly,
						your team gets the half-suit. If your team has the half
						suit, but you state the location of{' '}
						<b>one or more cards wrongly</b>, or if any member of
						the <b>opposing team </b>has a card in the half-suit you
						try to claim, the opposing team gets the half-suit and
						the opposing team gets the right to ask next.
					</p>
					<p>
						After any half-suit has been claimed, the game continues
						with the remaining cards. The player who gets the turn
						after declaration, either the player who declared or the
						opposing team, can choose to <b>transfer turn</b> to any
						other teammate.
					</p>
				</Typography>
			</Paper>
			<Paper className={classes.innerCard}>
				<Typography component={'h2'} variant={'h6'}>
					Public information
				</Typography>
				<Typography paragraph>
					<p>
						The following information is always available to
						everyone:{' '}
					</p>
					<ul>
						<li>
							Any player may get to know at any time what the{' '}
							<b>last three questions</b> were, who asked it, and
							what the answer was by accessing the logs available
							in the top right menu. Any question prior to that is
							called "History," and <b>may not be discussed.</b>
						</li>
						<li>
							Any player may know at any time how many cards
							another player, including a teammate.
						</li>
						<li>
							Paper, writing implements, or other devices used to
							record information about the state of the game aside
							from one's own brain and memory skills are{' '}
							<b>not allowed.</b>
						</li>
					</ul>
				</Typography>
			</Paper>
			<Paper className={classes.innerCard}>
				<Typography component={'h2'} variant={'h6'}>
					Endgame
				</Typography>
				<Typography paragraph>
					<p>
						As the game progresses players will run out of cards,
						either because an opponent successfully asks for their
						last card or because all their remaining cards belong to
						a half-suit that is claimed. A player who has no cards
						<b>cannot be asked</b> for a card, so the turn cannot be
						given to them.
					</p>
					<p>
						It is possible to lose all your remaining cards while it
						is your turn as a result of a claim. In this case you
						pass the turn to another member of your team who{' '}
						<b>still has cards</b>. In the event that more than one
						player in your team has cards, you choose which of your
						teammates gets the turn.
					</p>
					<p>
						When one team runs out of cards entirely,{' '}
						<b>no more questions</b> may be asked. The team with all
						the remaining cards must then try to claim out all
						remaining half-suits.
					</p>
					<p>
						The team which has claimed <b>most number</b> of
						half-suits wins.
					</p>
				</Typography>
			</Paper>
		</Paper>
	)
}
