
export enum Suit {
    Hearts,
    Spades,
    Diamonds,
    Clubs
}

export interface Card {
    suit: Suit;
    value: number;
    faceUp: boolean;
}