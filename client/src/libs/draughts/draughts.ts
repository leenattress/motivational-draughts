import { Game, Games, Move, Space } from './draughts.interface'

class Draughts {
    private games: Games;

    constructor() {
        this.games = {};
    }

    /**
     * makeId
     * Creates a short ID from a character set, of a required length
     *  */
    getId(length: number) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    logBoard(gameId: string) {
        this.checkGame(gameId);
        const game = this.getGame(gameId);
        let rowStr: string = '';
        for (var y: number = 0; y <= 7; y++) {
            for (var x: number = 0; x <= 7; x++) {
                rowStr += game.spaces[y][x].player;
            }
            rowStr += `
`
        }
        console.log('Game: ', gameId, rowStr);
    }

    addToHistory(gameId: string, move: Move) {
        this.checkGame(gameId);
        this.games[gameId].history.push(move);
    }

    checkGame(gameId: string) {
        if (!this.games[gameId]) {
            throw 'The game does not exist'
        }
    }
    checkPosition(x: number, y: number) {
        if (x > 7 || y > 7 || x < 0 || y < 0) {
            throw 'Out of bounds: The board is only 8x8'
        }
    }
    checkPlayer(player: number) {
        if (player !== 1 && player !== 2) {
            throw 'Player number must be 1 or 2'
        }
    }
    checkKingSpaces(row: number) {
        if (row !== 0 && row !== 7) {
            throw 'You can only king pieces at the edge'
        }
    }

    getNotation(gameId: string) {
        //TODO: https://en.wikipedia.org/wiki/Portable_Draughts_Notation
        // U+26C0 ⛀ WHITE DRAUGHTS MAN (HTML &#9920;)
        // U+26C1 ⛁ WHITE DRAUGHTS KING (HTML &#9921;)
        // U+26C2 ⛂ BLACK DRAUGHTS MAN (HTML &#9922;)
        // U+26C3 ⛃ BLACK DRAUGHTS KING (HTML &#9923;)  

        /*
        [Event "1981 World Championship Match, Game #37"]
        [Black "M. Tinsley"]
        [White "A. Long"]
        [Result "1–0"]
        1. 9-14 23-18 2. 14x23 27x18 3. 5-9 26-23 4. 12-16 30-26 5. 16-19 24x15 6. 10x19 23x16 7. 11x20 22-17 8. 7-11 18-15 9. 11x18 28-24 10. 20x27 32x5 11. 8-11 26-23 12. 4-8 25-22 13. 11-15 17-13 14. 8-11 21-17 15. 11-16 23-18 16. 15-19 17-14 17. 19-24 14-10 18. 6x15 18x11 19. 24-28 22-17 20. 28-32 17-14 21. 32-28 31-27 22. 16-19 27-24 23. 19-23 24-20 24. 23-26 29-25 25. 26-30 25-21 26. 30-26 14-9 27. 26-23 20-16 28. 23-18 16-12 29. 18-14 11-8 30. 28-24 8-4 31. 24-19 4-8 32. 19-16 9-6 33. 1x10 5-1 34. 10-15 1-6 35. 2x9 13x6 36. 16-11 8-4 37. 15-18 6-1 38. 18-22 1-6 39. 22-26 6-1 40. 26-30 1-6 41. 30-26 6-1 42. 26-22 1-6 43. 22-18 6-1 44. 14-9 1-5 45. 9-6 21-17 46. 18-22 BW
        */

        return this.getGame(gameId).history;
    }

    createGame(gameId: string) {
        let spaces: Space[][] = [];
        for (var y: number = 0; y <= 7; y++) {
            spaces[y] = [];
            for (var x: number = 0; x <= 7; x++) {
                spaces[y][x] = { player: 0, king: false };
            }
        }
        this.games[gameId] = {
            spaces,
            player1: '',
            player2: '',
            turn: 1,
            turnNumber: 0,
            history: []
        };
    }
    deleteGame(gameId: string) {
        this.checkGame(gameId);
        this.games[gameId] = null;
    }
    setupGame(gameId: string) {
        this.checkGame(gameId);
        const board: number[][] = [
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 2, 0, 2, 0, 2, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
        ];
        for (var y = 0; y <= board.length - 1; y++) {
            for (var x = 0; x <= board[y].length - 1; x++) {
                if (board[y][x] != 0) {
                    this.setPlayer(gameId, x, y, board[y][x])
                }
            }
        }
    }
    getGame(gameId: string): Game {
        this.checkGame(gameId);
        return this.games[gameId]
    }
    getSpace(gameId: string, x: number, y: number): Space {
        this.checkGame(gameId);
        this.checkPosition(x, y);
        return this.games[gameId].spaces[y][x]
    }

    setSpace(gameId: string, x: number, y: number, space: Space = { player: 0, king: false }) {
        this.checkGame(gameId);
        this.checkPosition(x, y);
        this.games[gameId].spaces[y][x] = space;
    }
    setKing(gameId: string, x: number, y: number) {
        this.checkGame(gameId);
        this.checkPosition(x, y);
        this.checkKingSpaces(y);
        const space = this.getSpace(gameId, x, y);
        if (space.player != 0) {
            space.king = true;
            this.setSpace(gameId, x, y, space)
        }
    }
    setPlayer(gameId: string, x: number, y: number, player: number) {
        this.checkGame(gameId);
        this.checkPosition(x, y);
        this.checkPlayer(player);
        const space = this.getSpace(gameId, x, y);
        space.player = player;
        this.setSpace(gameId, x, y, space)
    }
    movePiece(gameId: string, player: number, move: Move) {

        // is this move legal?
        this.isLegalMoveCheck(gameId, player, move);

        // get the old space using the first part of our move, the origin
        const space = this.getSpace(gameId, move.x1, move.y1);

        // which direction are we moving in?
        const up = move.y1 > move.y2;
        const down = move.y1 < move.y2;
        const right = move.x1 < move.x2;
        const left = move.x1 > move.x2;

        // this section determines if we are capturing and removes the attacked piece
        let capture: boolean = false;
        if (
            (move.x2 === move.x1 + 2 && move.y2 === move.y1 + 2) ||
            (move.x2 === move.x1 - 2 && move.y2 === move.y1 + 2) ||
            (move.x2 === move.x1 + 2 && move.y2 === move.y1 - 2) ||
            (move.x2 === move.x1 - 2 && move.y2 === move.y1 - 2)
        ) {
            const captureError = "Capture was attempted but there is no piece to capture";
            // move is diagonal two space, we are attempting a capture
            if (up && right) {
                const captured = this.getSpace(gameId, move.x1 + 1, move.y1 - 1);
                if (captured.player !== 0 && captured.player !== player) {
                    this.setSpace(gameId, move.x1 + 1, move.y1 - 1);
                    capture = true;
                } else { throw captureError + ' (up and right)' }
            }
            if (up && left) {
                const captured = this.getSpace(gameId, move.x1 - 1, move.y1 - 1);
                if (captured.player !== 0 && captured.player !== player) {
                    this.setSpace(gameId, move.x1 - 1, move.y1 - 1);
                    capture = true;
                } else { throw captureError + ' (up and left)' }
            }
            if (down && right) {
                const captured = this.getSpace(gameId, move.x1 + 1, move.y1 + 1);
                if (captured.player !== 0 && captured.player !== player) {
                    this.setSpace(gameId, move.x1 + 1, move.y1 + 1);
                    capture = true;
                } else { throw captureError + ' (down and right)' }
            }
            if (down && left) {
                const captured = this.getSpace(gameId, move.x1 - 1, move.y1 + 1);
                if (captured.player !== 0 && captured.player !== player) {
                    this.setSpace(gameId, move.x1 - 1, move.y1 + 1);
                    capture = true;
                } else { throw captureError + ' (down and left)' }
            }

        }

        // it is possible for us to be capturing in a direction
        const direction: number = capture ?
            space.player === 1 ? -2 : +2 :
            space.player === 1 ? -1 : +1

        // we can only allow regular pieces to move forwards
        if (!space.king) {
            if (move.y2 === move.y1 + direction) {
                // move is good

            } else {
                throw "Regular pieces can only move forwards"
            }
        }


        //copy it to the new space
        this.setSpace(gameId, move.x2, move.y2, space)

        // King our piece of the move is to the edge.
        // since we cant be unkinged, this is fine to trigger again
        if (move.y2 === 0 || move.y2 === 7) {
            this.setKing(gameId, move.x2, move.y2);
        }

        // clear the old space
        this.setSpace(gameId, move.x1, move.y1)

        // store the move in our games history
        this.addToHistory(gameId, move)

        // increment the move number so we might display it
        this.incrementMoveNumber(gameId);

        // is the move over? swap players
        this.changePlayer(gameId)

        // if we captured a piece this turn, return a boolean
        return capture;
    }

    canPlayerMove() {

    }
    canPlayerCapture(gameId: string, player: number) {
        const game: Game = this.getGame(gameId);
        let possibleMoves: Move[] = [];
        // for each row
        game.spaces.forEach((row, x: number) => {
            // for each space
            row.forEach((space: Space, y: number) => {
                // for each piece belonging to player
                if (player === space.player) {

                    // which direction are we moving in?
                    //const direction: number = space.player === 1 ? -2 : +2

                    // forward and left


                    // forward and right

                    // can a king capture any direction?
                    //if (space.king) {

                        // backward and left

                        // backward and right

                    //}
                }
            })
        });

        //return a list of spaces we can move
    }

    incrementMoveNumber(gameId: string) {
        this.checkGame(gameId);
        this.games[gameId].turnNumber++;
    }
    getTurnNumber(gameId: string) {
        return this.games[gameId].turnNumber
    }
    changePlayer(gameId: string) {
        this.games[gameId].turn = this.games[gameId].turn === 1 ? 2 : 1
    }

    isLegalMoveCheck(gameId: string, player: number, move: Move) {
        this.checkGame(gameId);
        this.checkPlayer(player);
        this.checkPosition(move.x1, move.y1);
        this.checkPosition(move.x2, move.y2);
        const from = this.getSpace(gameId, move.x1, move.y1)
        const to = this.getSpace(gameId, move.x2, move.y2)

        // we must be moving a piece
        if (from.player !== player) {
            throw "You can only move your own pieces"
        }

        // the move is not the same square
        if (
            move.x1 === move.x2 &&
            move.y1 === move.y2
        ) { throw "You can not move a piece onto itself"; }

        // the move is a diagonal
        /**
         * 🟥🟥🟥🟥🟥🟥🟥
         * 🟥🟩🟥🟥🟥🟩🟥
         * 🟥🟥🟩🟥🟩🟥🟥
         * 🟥🟥🟥🔵🟥🟥🟥
         * 🟥🟥🟩🟥🟩🟥🟥
         * 🟥🟩🟥🟥🟥🟩🟥
         * 🟥🟥🟥🟥🟥🟥🟥
         */

        if (
            (move.x2 === move.x1 + 1 && move.y2 === move.y1 + 1) ||
            (move.x2 === move.x1 - 1 && move.y2 === move.y1 + 1) ||
            (move.x2 === move.x1 + 1 && move.y2 === move.y1 - 1) ||
            (move.x2 === move.x1 - 1 && move.y2 === move.y1 - 1) ||
            (move.x2 === move.x1 + 2 && move.y2 === move.y1 + 2) ||
            (move.x2 === move.x1 - 2 && move.y2 === move.y1 + 2) ||
            (move.x2 === move.x1 + 2 && move.y2 === move.y1 - 2) ||
            (move.x2 === move.x1 - 2 && move.y2 === move.y1 - 2)
        ) {
            // move is diagonal one space
        } else {
            throw "You can only move diagonally, one or two spaces"
        }

        // we cannot move on top of another piece
        if (to.player !== 0) { throw "This space is occupied"; }

        return true;
    }
}

export { Draughts }