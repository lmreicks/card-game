
import './server/server';

import { Card } from './classes/card';
import { Suit } from './interfaces/state';

const card = new Card(Suit.Hearts, 5);

const table = document.getElementById('table');

console.log(table);

const cardEl = card.createElement();

cardEl.addEventListener('click', () => card.toggleFaceUp());

table.appendChild(card.createElement());
