import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < nrows; y++) {
      initialBoard.push([]);
      for (let x = 0; x < ncols; x++) {
        initialBoard[y].push(Math.random() < chanceLightStartsOn);
      }
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => cell === false))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const newBoard = JSON.parse(JSON.stringify(oldBoard));
      // TODO: in the copy, flip this cell and the cells around it

      if (y === 0) flipCell(y + 1, x, newBoard);
      if (x === 0) flipCell(y, x + 1, newBoard);
      if (y === nrows - 1) flipCell(y - 1, x, newBoard);
      if (x === ncols - 1) flipCell(y, x - 1, newBoard);
      if (y !== 0 && y!== nrows - 1) {
        flipCell(y - 1, x, newBoard);
        flipCell(y + 1, x, newBoard);
      }
      if (x !== 0 && x !== ncols - 1 ) {
        flipCell(y, x - 1, newBoard);
        flipCell(y, x + 1, newBoard);
      }


      flipCell(y, x, newBoard);
        
      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO


  // make table board

  // TODO
  return (
    <div className="Board">
      {hasWon() ? 'You Won!' : 
      <table>
        <tbody>
          {board.map((row, y) => (
            <tr key={y}>
              {row.map((cell, x) => (
                <Cell
                  key={`${y}-${x}`}
                  isLit={cell}
                  flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>}
    </div>
  );
}

export default Board;
