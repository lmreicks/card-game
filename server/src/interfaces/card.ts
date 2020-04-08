
export enum Suit {
    Hearts,
    Spades,
    Diamonds,
    Clubs
}

export interface Position {
    x: number;
    y: number;
}

export interface Card<T = any> {
    id: number;
    type: T;
    value: number;
    faceUp: boolean;
    position: Position;
    rotate?: number;
}