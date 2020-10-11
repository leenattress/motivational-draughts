import { Draughts } from './draughts';
import { Game, Move } from './draughts.interface';

describe('Draughts', () => {
    let draughts = new Draughts;
    beforeEach(async () => {
        draughts.createGame('test');
    });

    it('🍏 [IHJAMP] should be defined', () => {
        expect(draughts).toBeDefined();
    });

    it('🍏 [RAIUFZ] should create a new game', () => {
        const game: Game = draughts.getGame('test');
        expect(game.spaces.length).toBe(8); // 8 rows
        expect(game.spaces[0].length).toBe(8); // 8 columns
    });
    it('🍏 [RUGBUR] should setup the board', () => {
        draughts.setupGame('test');
        const game: Game = draughts.getGame('test');
        expect(game.spaces.length).toBe(8); // 8 rows
        expect(game.spaces[0].length).toBe(8); // 8 columns
    });

    it('🍎 [OXIEVX] shold throw an error when the game does not exist', () => {
        expect(() => {
            draughts.setPlayer('zzxxzxzx', 12, 15, 1)
        }).toThrow("The game does not exist")
    });

    it('🍏 [OITRGV] should have a zero in every space after created', () => {
        expect(draughts.getSpace('test', 3, 5).player).toBe(0);
    });

    it('🍏 [YUAZHM] should set the player in a space (1)', () => {
        draughts.setPlayer('test', 3, 5, 1);
        expect(draughts.getSpace('test', 3, 5).player).toBe(1);
    });
    it('🍏 [QWTCGU] should set the player in a space (2)', () => {
        draughts.setPlayer('test', 0, 0, 1);
        expect(draughts.getSpace('test', 0, 0).player).toBe(1);
    });
    it('🍏 [ATVRQK] should set the player in a space (3)', () => {
        draughts.setPlayer('test', 7, 7, 1);
        expect(draughts.getSpace('test', 7, 7).player).toBe(1);
    });
    it('🍏 [CNFNXF] should set a space to empty', () => {
        draughts.setSpace('test', 3, 5);
        expect(draughts.getSpace('test', 3, 5).player).toBe(0);
    });

    it('🍎 [TGJDZC] should throw because we can only use 1 and 2 to set the player', () => {
        expect(() => {
            draughts.setPlayer('test', 3, 5, 3)
        }).toThrow("Player number must be 1 or 2")
    });
    it('🍎 [OWYVVB] should throw because the board is only 8x8 (1)', () => {
        expect(() => {
            draughts.setPlayer('test', 12, 15, 1)
        }).toThrow("Out of bounds: The board is only 8x8")
    });
    it('🍎 [TUQAZU] should throw because the board is only 8x8 (2)', () => {
        expect(() => {
            draughts.setPlayer('test', 8, 8, 1)
        }).toThrow("Out of bounds: The board is only 8x8")
    });
    it('🍎 [WOGBKW] should throw because the board is only 8x8 (3)', () => {
        expect(() => {
            draughts.setPlayer('test', -1, -1, 1)
        }).toThrow("Out of bounds: The board is only 8x8")
    });

    it('🍏 [VEWUFL] should king the piece in a space', () => {
        draughts.setPlayer('test', 0, 0, 1);
        draughts.setKing('test', 0, 0);
        expect(draughts.getSpace('test', 0, 0).king).toBe(true);
    });
    it('🍎 [MPJZOY] should throw an error if the piece to king is not on the edge', () => {
        draughts.setPlayer('test', 5, 5, 1);
        expect(() => {
            draughts.setKing('test', 5, 5);
        }).toThrow("You can only king pieces at the edge")
    });

    it('🍏 [ZSERRB] should allow the move down and right', () => {
        draughts.setPlayer('test', 5, 5, 1);
        const move: Move = {
            x1: 5,
            y1: 5,
            x2: 6,
            y2: 6
        }
        expect(draughts.isLegalMoveCheck('test', 1, move)).toBe(true);
    });
    it('🍏 [HFENUH] should allow the move down and left', () => {
        draughts.setPlayer('test', 5, 5, 1);
        const move: Move = {
            x1: 5,
            y1: 5,
            x2: 6,
            y2: 4
        }
        expect(draughts.isLegalMoveCheck('test', 1, move)).toBe(true);
    });
    it('🍏 [JEYOCA] should allow the move up and left', () => {
        draughts.setPlayer('test', 5, 5, 1);
        const move: Move = {
            x1: 5,
            y1: 5,
            x2: 4,
            y2: 4
        }
        expect(draughts.isLegalMoveCheck('test', 1, move)).toBe(true);
    });
    it('🍏 [UOIABM] should allow the move up and right', () => {
        draughts.setPlayer('test', 5, 5, 1);
        const move: Move = {
            x1: 5,
            y1: 5,
            x2: 4,
            y2: 6
        }
        expect(draughts.isLegalMoveCheck('test', 1, move)).toBe(true);
    });
    it('🍎 [HPTBIQ] should disallow a move upwards', () => {
        draughts.setPlayer('test', 5, 5, 1);
        const move: Move = {
            x1: 5,
            y1: 5,
            x2: 4,
            y2: 5
        }
        expect(() => {
            draughts.isLegalMoveCheck('test', 1, move);
        }).toThrow("You can only move diagonally, one or two spaces");
    });
    it('🍎 [JMNFIJ] should disallow a move right', () => {
        draughts.setPlayer('test', 5, 5, 1);
        const move: Move = {
            x1: 5,
            y1: 5,
            x2: 6,
            y2: 5
        }
        expect(() => {
            draughts.isLegalMoveCheck('test', 1, move);
        }).toThrow("You can only move diagonally, one or two spaces");
    });
    it('🍎 [VGSEQW] should disallow a move downwards', () => {
        draughts.setPlayer('test', 5, 5, 1);
        const move: Move = {
            x1: 5,
            y1: 5,
            x2: 5,
            y2: 6
        }
        expect(() => {
            draughts.isLegalMoveCheck('test', 1, move);
        }).toThrow("You can only move diagonally, one or two spaces");
    });
    it('🍎 [XTQUPF] should disallow a move left', () => {
        draughts.setPlayer('test', 5, 5, 1);
        const move: Move = {
            x1: 5,
            y1: 5,
            x2: 4,
            y2: 5
        }
        expect(() => {
            draughts.isLegalMoveCheck('test', 1, move);
        }).toThrow("You can only move diagonally, one or two spaces");
    });
    it('🍎 [BBFXIA] should disallow a move far up and right', () => {
        draughts.setPlayer('test', 3, 3, 1);
        const move: Move = {
            x1: 3,
            y1: 3,
            x2: 6,
            y2: 6
        }
        expect(() => {
            draughts.isLegalMoveCheck('test', 1, move);
        }).toThrow("You can only move diagonally, one or two spaces");
    });
    it('🍎 [LMPLOH] should disallow a move off the edge of the board', () => {
        draughts.setPlayer('test', 6, 6, 1);
        const move: Move = {
            x1: 6,
            y1: 6,
            x2: 9,
            y2: 9
        }
        expect(() => {
            draughts.isLegalMoveCheck('test', 1, move);
        }).toThrow("Out of bounds: The board is only 8x8");
    });

    it('🍎 [YJAQQO] should allow only moving your pieces', () => {
        draughts.setupGame('test');
        const move: Move = {
            x1: 1,
            y1: 2,
            x2: 2,
            y2: 3
        }
        expect(() => {
            draughts.movePiece('test', 1, move);
        }).toThrow("You can only move your own pieces");
    });
    it('🍏 [WJBUNB] should move a piece', () => {
        draughts.setupGame('test');
        const move: Move = {
            x1: 0,
            y1: 5,
            x2: 1,
            y2: 4
        }
        draughts.movePiece('test', 1, move);
        expect(draughts.getSpace('test', move.x1, move.y1).player).toBe(0);
        expect(draughts.getSpace('test', move.x2, move.y2).player).toBe(1);
    });

    it('🍏 [TJOFFG] should capture a piece up and left', () => {
        draughts.setPlayer('test', 6, 6, 1);
        draughts.setPlayer('test', 5, 5, 2);
        const move: Move = {
            x1: 6,
            y1: 6,
            x2: 4,
            y2: 4
        }
        expect(draughts.getSpace('test', 5, 5).player).toBe(2);             // player we are jumping
        expect(draughts.getSpace('test', move.x1, move.y1).player).toBe(1); // attacker
        expect(draughts.getSpace('test', move.x2, move.y2).player).toBe(0); // empty
        draughts.movePiece('test', 1, move);                                // perform jump
        expect(draughts.getSpace('test', move.x1, move.y1).player).toBe(0); // empty
        expect(draughts.getSpace('test', move.x2, move.y2).player).toBe(1); // attacker
        expect(draughts.getSpace('test', 5, 5).player).toBe(0);             // player is gone
    });

    it('🍏 [KFSYLQ] should capture a piece up and right', () => {
        const move: Move = { 
            x1: 4,
            y1: 4,
            x2: 6,
            y2: 2
        }
        draughts.setPlayer('test', 4, 4, 1);                                // attacker start
        draughts.setPlayer('test', 5, 3, 2);                                // enemy start
        expect(draughts.getSpace('test', 5, 3).player).toBe(2);             // player we are jumping
        expect(draughts.getSpace('test', move.x1, move.y1).player).toBe(1); // attacker
        expect(draughts.getSpace('test', move.x2, move.y2).player).toBe(0); // empty
        draughts.movePiece('test', 1, move);                                // perform jump
        expect(draughts.getSpace('test', move.x1, move.y1).player).toBe(0); // empty
        expect(draughts.getSpace('test', move.x2, move.y2).player).toBe(1); // attacker
        expect(draughts.getSpace('test', 5, 3).player).toBe(0);             // player is gone
    });    

    
    it('🍏 [YADMSY] should capture a piece down and left', () => {
        draughts.setPlayer('test', 5, 5, 2);
        draughts.setPlayer('test', 4, 6, 1);
        const move: Move = {
            x1: 5,
            y1: 5,
            x2: 3,
            y2: 7
        }
        expect(draughts.getSpace('test', 4, 6).player).toBe(1);             // player we are jumping
        expect(draughts.getSpace('test', move.x1, move.y1).player).toBe(2); // attacker
        expect(draughts.getSpace('test', move.x2, move.y2).player).toBe(0); // empty
        draughts.movePiece('test', 2, move);                                // perform jump
        expect(draughts.getSpace('test', move.x1, move.y1).player).toBe(0); // empty
        expect(draughts.getSpace('test', move.x2, move.y2).player).toBe(2); // attacker
        expect(draughts.getSpace('test', 4, 6).player).toBe(0);             // player is gone
    });


    it('🍏 [MLZJXJ] should capture a piece down and right', () => {
        draughts.setPlayer('test', 5, 5, 2);
        draughts.setPlayer('test', 6, 6, 1);
        const move: Move = {
            x1: 5,
            y1: 5,
            x2: 7,
            y2: 7
        }
        expect(draughts.getSpace('test', 6, 6).player).toBe(1);             // player we are jumping
        expect(draughts.getSpace('test', move.x1, move.y1).player).toBe(2); // attacker
        expect(draughts.getSpace('test', move.x2, move.y2).player).toBe(0); // empty
        draughts.movePiece('test', 2, move);                                // perform jump
        expect(draughts.getSpace('test', move.x1, move.y1).player).toBe(0); // empty
        expect(draughts.getSpace('test', move.x2, move.y2).player).toBe(2); // attacker
        expect(draughts.getSpace('test', 6, 6).player).toBe(0);             // player is gone
    }); 

    // 🍏 [RUJMEL] king capture up right
    // 🍏 [BTDUYY] king capture up left
    // 🍏 [XEWWFT] king capture down right
    // 🍏 [WECFTK] king capture down left
    // 🍏 [ADANUW] piece capture correct direction player 1 right
    // 🍏 [JETWXM] piece capture correct direction player 1 left
    // 🍎 [JORMDP] piece capture incorrect direction player 1 right
    // 🍎 [IYUGWJ] piece capture incorrect direction player 1 left
    it('🍏 [FWSMGL] piece is kinged when it reaches the back player 1 (top)', () => {        
        draughts.setupGame('test');
        draughts.setPlayer('test', 1, 1, 1);
        const move: Move = {
            x1: 1,
            y1: 1,
            x2: 0,
            y2: 0
        }
        draughts.movePiece('test', 1, move);
        expect(draughts.getSpace('test', move.x1, move.y1).player).toBe(0);
        expect(draughts.getSpace('test', move.x2, move.y2).player).toBe(1);
        expect(draughts.getSpace('test', move.x2, move.y2).king).toBe(true);
    });  
    it('🍏 [ZHLXLU] piece is kinged when it reaches the back player 2 (bottom)', () => {        
        draughts.setupGame('test');
        draughts.setPlayer('test', 6, 6, 2);
        const move: Move = {
            x1: 6,
            y1: 6,
            x2: 7,
            y2: 7
        }
        draughts.movePiece('test', 2, move);
        expect(draughts.getSpace('test', move.x1, move.y1).player).toBe(0);
        expect(draughts.getSpace('test', move.x2, move.y2).player).toBe(2);
        expect(draughts.getSpace('test', move.x2, move.y2).king).toBe(true);
    });        
    // 🍏 [ZEFLYQ] game is over because player 1 has no pieces
    // 🍏 [HIRITJ] game is over because player 2 has no pieces
    // 🍏 [SQLPSD] game is over because player 1 cannot move
    // 🍏 [OGQCRI] game is over because player 2 cannot move
    // 🍏 [EPAENN] game is over because player 1 surrenders
    // 🍏 [KPXQPG] game is over because player 2 surrenders
    
    

});
