
import { Move } from "./move";

export interface Rules {
    /**
     * Should return either the new state or a bool
     * @param move 
     */
    evaluateMove(move: Move): boolean;
}