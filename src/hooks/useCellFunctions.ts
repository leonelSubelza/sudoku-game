import { CellStatus, CellValueStatus } from "@/model/enums";
import { Board, BoardGame, Cell } from "@/model/entities";

export function useCellFunctions() {
  const resetCellColors = (board: BoardGame) => {
    board.forEach( (row: Cell[]) => {
      row.forEach( (cell: Cell) => {
        cell.status = CellStatus.NORMAL;
      })
    })
  }
  
  const updateRowAndColRelated = (board: BoardGame, actualCell: Cell) => {
    board[actualCell.row].forEach((cell: Cell) => {
        if(cell !== actualCell){
          cell.status = CellStatus.SHADING
        }      
    })
    board.forEach((row: Cell[]) => {
      if(row[actualCell.col] !== actualCell){
        row[actualCell.col].status = CellStatus.SHADING;
      }      
  })
  }
  
  const updateEqualsValues = (board: BoardGame, actualCell: Cell) => {
    board.forEach( (row: Cell[]) => {
      row.forEach( (cell: Cell) => {
        if(cell !== actualCell && cell.value === actualCell.value) {
          cell.status = CellStatus.EQUAL;
        }
      })
    })
  }
  
  const isANumber = (value: string): boolean => {
    const numbers: string[] = ['0','1','2','3','4','5','6','7','8','9'];
    return numbers.includes(value);
  }

  return {
    // getBackgroundCell,
    // getBorderCell,
    // getColorCell,
    resetCellColors,
    updateEqualsValues,
    updateRowAndColRelated,
    isANumber,
  };
}