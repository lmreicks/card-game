import { Move, MoveLocation } from "../interfaces/move";
import { Table } from "../interfaces/table";
import { Player } from "../interfaces/player";
import { UnoMoveType } from "./constants";

export class DrawMove implements Move<UnoMoveType> {
    type: UnoMoveType.Draw;
    location: MoveLocation;
    
    applyMove(move: DrawMove, table: Table, players: Player[]) {
        // 
    }
}