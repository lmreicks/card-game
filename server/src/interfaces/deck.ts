import { Card } from "./card";

export interface Deck {
    cards: Card[];

    getCard(id: number): Card;
}