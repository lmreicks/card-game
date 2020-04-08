import { Table } from "../interfaces/table";
import { UnoCard } from "./card";
import { UnoDeck } from "./deck";

export class UnoTable extends Table {
    cards: UnoCard[];

    drawPile: UnoCard[];
    discardPile: UnoCard[];

    readonly deck: UnoDeck;

    constructor(deck: UnoDeck) {
        super();
        this.deck = deck;

        this.cards = deck.cards;
        this.drawPile = [...this.cards];
        this.shuffle(this.drawPile);
    }

    draw(): UnoCard {
        return this.drawPile.pop();
    }
}