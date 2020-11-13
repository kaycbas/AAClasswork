// DON'T TOUCH THIS CODE
if (typeof window === 'undefined') {
  var Piece = require("./piece");
}
// DON'T TOUCH THIS CODE

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid() {
  const grid = [];
  for (let i = 0; i < 8; i++) {
    grid.push(new Array(8));
  }

  grid[3][3] = new Piece('white');
  grid[4][4] = new Piece('white');
  grid[3][4] = new Piece('black');
  grid[4][3] = new Piece('black');

  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board() {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [0, 1], [1, 1], [1, 0],
  [1, -1], [0, -1], [-1, -1],
  [-1, 0], [-1, 1]
];

Board.my_var = 8;


/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  return (pos[0] >= 0 && pos[0] < 8) && (pos[1] >= 0 && pos[1] < 8)
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if (!this.isValidPos(pos)) {
    throw new Error('Not valid pos!');
  }
  return this.grid[pos[0]][pos[1]];
};

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  let piece = this.getPiece(pos);
  if (piece && piece.color === color) {
    return true;
  } else {
    return false;
  }
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  // return (this.getPiece(pos)) ? true : false;
  return (this.grid[pos[0]][pos[1]]) ? true : false;
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */
Board.prototype._positionsToFlip = function (pos, color, dir, positionsToFlip) {
  if (!positionsToFlip) {
    positionsToFlip = [];
  } else {
    positionsToFlip.push(pos);
  }
  // (!this.isMine(pos, color))
  let next = [pos[0] + dir[0], pos[1] + dir[1]];
  if (!this.isValidPos(next)) {
    return [];
  } else if (!this.isOccupied(next)) {
    return [];
  } else if (this.isMine(next, color)) {
    return positionsToFlip;
  } else {
    return this._positionsToFlip(next, color, dir, positionsToFlip);
  }
};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if (this.isOccupied(pos)) {
    return false;
  }
  for (let i = 0; i < Board.DIRS.length; i++) {
    let piecesToFlip = this._positionsToFlip(pos, color, Board.DIRS[i]);
    if (piecesToFlip.length > 0) {
      return true;
    }
  }
  return false;
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  // debugger;
  if (!this.validMove(pos, color)) {
    throw new Error('Invalid move!');
  }
  this.grid[pos[0]][pos[1]] = new Piece(color);
  let piecesToFlip = [];
  for (let i = 0; i < Board.DIRS.length; i++) {
    let newPieces = this._positionsToFlip(pos, color, Board.DIRS[i]);
    if (newPieces.length > 0) {
      piecesToFlip = piecesToFlip.concat(newPieces);
    }
  }
  // debugger;
  piecesToFlip.forEach((pos) => {
    let pc = this.grid[pos[0]][pos[1]];
    if (pc.oppColor() === color) {
      pc.flip();
    }
  });
};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  let result = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (this.validMove([i, j], color)) {
        result.push([i, j]);
      }
    }
  }
  return result;
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  return this.validMoves(color).length !== 0;
};



/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  return !this.hasMove('black') && !this.hasMove('white');
};

Board.prototype.score = function (color) {
  let count = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let pc = this.grid[i][j];
      if (pc && pc.color === color) {
        count++;
      }
    }
  }
  return count;
};


/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  let bs = this.score('black');
  let ws = this.score('white');
  console.log(`     W: ${ws}, B: ${bs}`);
  
  let bottom = '  ';
  console.log("  _ _ _ _ _ _ _ _")
  for (let i = 0; i < 8; i++) {
    let row = i + '|';
    for (let j = 0; j < 8; j++) {
      piece = this.getPiece([i, j]) ? this.getPiece([i, j]).toString() : '_';
      row += piece + '|';
    }
    bottom += i + ' ';
    console.log(row);
  }

  console.log(bottom);
};

board = new Board();
board.print();

// DON'T TOUCH THIS CODE
if (typeof window === 'undefined') {
  module.exports = Board;
}
// DON'T TOUCH THIS CODE