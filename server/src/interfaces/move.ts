enum MoveLocationType {
    Player,
    Table
}

export interface MoveLocation {
    type: MoveLocationType;
    index?: number;
}

export interface Move<T = any> {
    type: T;
    to?: MoveLocation;
    from?: MoveLocation;
}