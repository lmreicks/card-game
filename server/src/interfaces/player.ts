import * as WebSocket from 'ws';
import { Card } from './card';

export interface Player {
    score: number;
    socket: WebSocket;
    hand: Card[];
}