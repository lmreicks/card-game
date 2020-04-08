import { UnoCard, UnoSuit } from "./card";
import { Deck } from "../interfaces/deck";
import { Card } from "../interfaces/card";

type BasicCard = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

enum UnoTypes {
    Zero,
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    DrawTwo,
    Skip,
    Reverse,
    Wild,
    WildPlusFour
}

export class UnoDeck implements Deck {
    private _cards: Map<number, UnoCard>;

    readonly cards: UnoCard[];

    getCard(id: number): UnoCard {
        return this._cards.get(id);
    }

    constructor() {
        // 108 cards in total
        this._cards = new Map<number, UnoCard>();
        this.createCards();
        this.cards = Array.from(this._cards.values());
    }

    /**
     * There are 108 cards in a Uno deck.
     * There are four suits, Red, Green, Yellow and Blue, each consisting of
     * one 0 card, two 1 cards, two 2s, 3s, 4s, 5s, 6s, 7s, 8s and 9s;
     * two Draw Two cards; two Skip cards; and two Reverse cards.
     * In addition there are four Wild cards and four Wild Draw Four cards.
     */
    private createCards(): void {
        const colors = [ UnoSuit.Red, UnoSuit.Blue, UnoSuit.Green, UnoSuit.Yellow ];
        let id = 0;
        for (let color of colors) {
            // one 0 card
            this._cards.set(id++, new UnoCard(id, color, 0));
            // two 1 cards, two 2s, 3s, 4s, 5s, 6s, 7s, 8s and 9s;
            for (let value = 1; value <= 9; value++) {
                this._cards.set(id++, new UnoCard(id, color, value));
                this._cards.set(id++, new UnoCard(id, color, value));
            }

            // two Draw Two cards;
            this._cards.set(id++, new UnoCard(id, color, UnoTypes.DrawTwo));
            this._cards.set(id++, new UnoCard(id, color, UnoTypes.DrawTwo));
            // two Skip cards;
            this._cards.set(id++, new UnoCard(id, color, UnoTypes.Skip));
            this._cards.set(id++, new UnoCard(id, color, UnoTypes.Skip));
            // and two Reverse cards
            this._cards.set(id++, new UnoCard(id, color, UnoTypes.Reverse));
            this._cards.set(id++, new UnoCard(id, color, UnoTypes.Reverse));
        }

        // special cards four of each: Wild, WildPlusFour
        for (let i = 0; i < 4; i++) {
            this._cards.set(id++, new UnoCard(id, UnoSuit.Wild, UnoTypes.Wild));
            this._cards.set(id++, new UnoCard(id, UnoSuit.Wild, UnoTypes.WildPlusFour));
        }
    }
}