import { Player } from "./player";
import { Deck } from "./deck";

export interface Game {
    name: string;
    players: Player[];
    deck: Deck;
}