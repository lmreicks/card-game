import { Rules } from "../interfaces/rules";
import { Move } from "../interfaces/move";

// Discard pile
// Draw Pile

/**
 * List of Moves
 * 
 * - Deal
 * - Draw Top card to start
 * - 
 */


/**
 * 2-10 players, (ages 7 and over)
 * 7 cards dealt face down to players
 * Other cards placed in draw pile face down (Draw Pile)
 * Space for (Discard Pile)
 * 
 * Top Card placed in Discard Pile (begin game)
 * 
 * If Top Card is a special card:
 *   -- Wild Draw Four Card - Another card is turned over on top of this by the
                      dealer.
     -- Wild Card - The player to the right (left) of the dealer declares the colour.
     -- Draw Two Card - The player to the right (left) of the dealer draws two cards
                from the stock and loses her turn.
     -- Skip Card - The player to the right (left) of the dealer loses her turn.
     -- Reverse Card - Turn passes to the left (right), starting with the player on
               the left (right) of the dealer
 */
export class UnoRules implements Rules {
    /**
     * 
     * @param move
     */
    evaluateMove(move: Move): boolean {
        // if type of deal move
        // deal

        // if type of draw move
        // always allowed :)

        // if type of play move
        // check the top card on the discard pile
        // if card is a action card or wild card
        // do action
        // else
        // if color or value matches
        // it is valid 
        return true; 
    }
}