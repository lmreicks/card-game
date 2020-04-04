import { Table } from "./table";
import { Move } from "./move";

export interface Rules {
    evaluateMove(move: Move);
}