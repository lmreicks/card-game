import { Position } from "./util";

export interface State {
    pile: Pile;
    over;
    score;
    players;
}

export interface Pile {
    name: string;
    position: Position;
    visible: boolean;
    cards: ICard[];
}

export enum Suit {
    Hearts,
    Spades,
    Clubs,
    Diamonds
}

export interface ICard {
    suit: Suit;
    position: Position;
    faceUp: boolean;
    rotate?: number;
}