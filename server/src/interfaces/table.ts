import { Card } from "./card";

export abstract class Table {
    cards: Card[];

    shuffle(cards: Card[]): void {
        for (let i = cards.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      
          // swap elements array[i] and array[j]
          // we use "destructuring assignment" syntax to achieve that
          // same can be written as:
          // let t = array[i]; array[i] = array[j]; array[j] = t
          [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }
}