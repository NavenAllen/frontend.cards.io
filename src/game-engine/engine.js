/**
 * This will be the interface of the engine
 * i.e. the user will interact with things here
 * we can have an engine, which can be structured like this
 * 
 * If a deck of cards is supplied, we use that, else we have a default deck
 * based on the number of players, we create hands for each player
 * the engine keeps track of which player has what cards,
 * and also takes care of animations which display interactions between players
 * 
 * we keep a draw function, which will actually mount the Hand components, 
 * which can be dynamic based on the number of players and the screen size
 * 
 * Basically, the aim is to minimise the work of someone who wants to create a card 
 * game, and give him a head-start, by handling most of the things
 */
