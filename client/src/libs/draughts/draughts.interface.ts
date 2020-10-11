export interface Piece {
    x: number;
    y: number;
    player: number;
    king: boolean;
    selected: boolean;
}

export interface Space {
    player: number;
    king: boolean;
}
export interface Move {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
export interface Game {
    spaces: Space[][];
    player1: string;
    player2: string;
    turn: number;
    history?: Move[];
    turnNumber: number;
}
export interface Games {
    [index: string]: Game;
}

