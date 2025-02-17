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
  function generateSudoku(): Board {
    const board = createEmptyBoard();
    fillBoard(board);
    return board;
  }

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
