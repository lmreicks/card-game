import { Card, Position } from "../interfaces/card";

export enum UnoSuit {
    Red, 
    Green,
    Yellow,
    Blue,
    Wild
}

export class UnoCard implements Card<UnoSuit> {
    id: number;
    type: UnoSuit;
    value: number;
    position: Position;
    faceUp: boolean = false;
    rotate: number = 0;

    constructor(id: number, type: UnoSuit, value: number) {
        this.id = id;
        this.type = type;
        this.value = value;
    }
}