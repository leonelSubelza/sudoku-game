import { Board, BoardGame, Cell } from "@/model/entities";
import { CellStatus, CellValueStatus, DIFFICULTS } from "@/model/enums";

export function useSudokuFunctions() {
  /**
   * Verifica si un número puede colocarse en una celda específica.
   */
  function isValid(
    board: Board,
    row: number,
    col: number,
    num: number
  ): boolean {
    // Verificar fila
    if (board[row].includes(num)) return false;

    // Verificar columna
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) return false;
    }

    // Verificar subcuadrícula
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }

    return true;
  }

  /**
   * Rellena la cuadrícula utilizando backtracking.
   */
  function fillBoard(board: Board): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
          for (const num of numbers) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (fillBoard(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Genera una cuadrícula vacía de Sudoku.
   */
  function createEmptyBoard(): Board {
    return Array.from({ length: 9 }, () => Array(9).fill(0));
  }

  /**
   * Elimina números de la cuadrícula para crear el desafío.
   */
  function removeNumbers(board: Board, clues: number): Board {
    const totalCells = 81;
    const cellsToRemove = totalCells - clues;
    const positions = shuffleArray(
      Array.from({ length: totalCells }, (_, i) => i)
    );

    for (let i = 0; i < cellsToRemove; i++) {
      const pos = positions[i];
      const row = Math.floor(pos / 9);
      const col = pos % 9;
      board[row][col] = 0;
    }

    return board;
  }

  /**
   * Baraja un array aleatoriamente.
   */
  function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /**
   * Genera un Sudoku completo y elimina números para crear un desafío.
   */
  function generateSudoku(clues: number = 30): Board {
    const board = createEmptyBoard();
    fillBoard(board);
    // console.log("OG:");

    // board.forEach( row => {
    //   let rowP = "";
    //   row.forEach( value => {
    //     rowP = rowP + value +", ";
    //   })
    //   console.log(rowP);

    //   rowP = "";
    // })

    // return removeNumbers(board, clues);
    return board;
  }

  // POSIBLEMENTE BORRAR
  /* Genera una matriz de 3x3 representando una cuadircula de 9 numeros del sudoku */
  // function getSubgrid(
  //   board: Board,
  //   row: number,
  //   col: number
  // ): number[][] {
  //   let subgrid: number[][] = [];
  //   let rowSubgrid: number[] = [];
  //   let colAux = col;
  //   for (let count = 0; count < 9; count++) {
  //     rowSubgrid.push(board[row][colAux]);
  //     if (colAux === col + 2) {
  //       subgrid.push(rowSubgrid);
  //       rowSubgrid = [];
  //       colAux = col;
  //       row++;
  //     } else {
  //       colAux++;
  //     }
  //   }
  //   return subgrid;
  // }

  // POSIBLEMENTE BORRAR
  // Genera un tablero de sudoku de 9 casilleros de 3x3
  // function getSubgrids(board: Board): BoardSubgrids {
  //   let subgrids: number[][][] = [];

  //   let row = 0;
  //   let col = 0;
  //   for (let count = 0; count < 9; count++) {
  //     subgrids.push(getSubgrid(board, row, col));
  //     if (col === 6) {
  //       col = 0;
  //       row = row + 3;
  //     } else {
  //       col = col + 3;
  //     }
  //   }
  //   return subgrids;
  // }

  function getBoardGame(board: Board, difficult: DIFFICULTS): BoardGame {
    removeNumbers(board, difficult);

    return board.map((row: number[], i: number) =>
      row.map((cell: number, j: number) => ({
        value: cell,
        row: i,
        col: j,
        status: CellStatus.NORMAL,
        valueStatus: CellValueStatus.DEFAULT,
        notes: [],
      }))
    );
  }

  function isCorrect(
    boardComplete: Board,
    cell: Cell,
    newValue: number
  ) {
    // console.log("Board complete que se le pasa: ");
    // console.log(boardComplete);
    
    // boardComplete.forEach( row => {
    //   let rowP = "";
    //   row.forEach( (cell) => {
    //     rowP = rowP + cell +", ";
    //   })
    //   console.log(rowP);
      
    //   rowP = "";
    // }) 
    // console.log("cell");
    // console.log(cell);
    
    

    return boardComplete[cell.row][cell.col] === newValue;
  }

  function isCellValuePreviouslyCorrect(
    boardComplete: Board,
    cell: Cell
  ) {
    return boardComplete[cell.row][cell.col] === cell.value;
  }

  function print(boardC: Board, boardG: BoardGame) {
    console.log("Board Completo: ");
    boardC.forEach( row => {
      let rowP = "";
      row.forEach( (cell) => {
        rowP = rowP + cell +", ";
      })
      console.log(rowP);
      
      rowP = "";
    }) 

    console.log("board Game: ");
    boardG.forEach( row => {
      let rowP = "";
      row.forEach( (cell: Cell) => {
        rowP = rowP + cell.value +", ";
      })
      console.log(rowP);
      
      rowP = "";
    }) 
  }

  function showCorrectValue(
    boardComplete: Board,
    boardGame: BoardGame
  ): Cell | undefined {
    // flatMap crea una copia del array
    const emptyCells: Cell[] = boardGame.flatMap((row: Cell[]) =>
      row.filter((c: Cell) => (c.valueStatus === CellValueStatus.INCORRECT || c.value === 0))
    );
    if (emptyCells.length === 0) {
      return undefined;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];

    boardGame[randomCell.row][randomCell.col].value =
      boardComplete[randomCell.row][randomCell.col];
    
    // console.log("celda correcta:");
    // console.log(randomCell);

    // console.log("show correct value:");
    // console.log("BoardComplete");
    // console.log(boardComplete);
    // console.log("BoardGame");
    // console.log(boardGame);

    return randomCell;
  }

  function getActualNumberCounter(boardGame: BoardGame): number[] {
    const numberCounter = Array(9).fill(0);
    boardGame.forEach((row) => {
      row.forEach((cell) => {
        if (cell.value !== 0) {
          numberCounter[cell.value - 1]++;
        }
      });
    });
  
    return numberCounter;
  }

  const isCorrectAndDefaultValue = (boardGame: BoardGame, boardComplete: Board, cell: Cell) => {
    const cellBoardGame = boardGame[cell.row][cell.col];
    return cellBoardGame.value === boardComplete[cell.row][cell.col]
    && cellBoardGame.valueStatus === CellValueStatus.DEFAULT;
  }

  
  // Generar un Sudoku con 30 pistas (nivel medio)
  // const sudoku = generateSudoku(30);

  // Imprimir el Sudoku generado
  // sudoku.forEach(row => console.log(row.join(" ")));

  return {
    createEmptyBoard,
    generateSudoku,
    getBoardGame,
    removeNumbers,
    isCellValuePreviouslyCorrect,
    isCorrect,
    print,
    showCorrectValue,
    getActualNumberCounter,
    isCorrectAndDefaultValue,
  };
}
