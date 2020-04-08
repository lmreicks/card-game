import { Player } from "../interfaces/player";
import { Move } from "../interfaces/move";
import { Table } from "../interfaces/table";
import { UnoMoveType } from "./constants";
import { Game } from "../interfaces/game";
import { UnoDeck } from "./deck";
import { UnoTable } from "./table";
import { UnoCard } from "./card";

export class Uno implements Game {
    name: 'Uno';
    readonly table: UnoTable;
    players: Player[];
    moveQueue: Move[];
    readonly deck: UnoDeck;
    
    constructor(players: Player[]) {
        this.players = players;
        this.deck = new UnoDeck();
        this.table = new UnoTable(this.deck);
        players[0].socket.on('message', () => {
            console.log('message');
        });

        this.startGame();

        // deal
        for (let player of players) {

        }
    }

    startGame(): void {

        // while (gameIsntOver) {
            // get the player whose move it is
            // get the next move 
            // check if its legal

            // if it is
            // applyMove

            // broadcast new game state
            // or old game state if not legal
        // }
    }

    sendInitialState(): void {
        // deal cards from deck
        for (let player of this.players) {
            // pull 7 cards from table
            for (let i = 0; i < 7; i++) {
                player.hand.push(this.table.draw());
            }
        }

        const topCard = this.table.draw(); 
    }

    applyMove(move: Move) {
        // iff moving to table
        // applyToTable

        // from
        // removeFrom whereever

        switch (move.type) {
            case UnoMoveType.Draw:
                // draw a card
                // move card from table to player
            case UnoMoveType.Play:
                // play a card
        }

        // draw a card

        // play a card
    }
}