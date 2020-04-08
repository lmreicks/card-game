import { Player } from "./player";
import { Table } from "./table";

export interface GameState {
    players: Player[]
    table: Table;
}