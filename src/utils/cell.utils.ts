import { CellStatus, CellValueStatus } from "@/model/enums";
import { BoardGame, Cell } from "@/model/entities";

export const resetCellColors = (board: BoardGame) => {
  board.forEach( (row: Cell[]) => {
    row.forEach( (cell: Cell) => {
      cell.status = CellStatus.NORMAL;
    })
  })
}

export const updateRowAndColRelated = (board: BoardGame, actualCell: Cell) => {
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

export const updateEqualsValues = (board: BoardGame, actualCell: Cell) => {
  board.forEach( (row: Cell[]) => {
    row.forEach( (cell: Cell) => {
      if(cell !== actualCell && cell.value === actualCell.value) {
        cell.status = CellStatus.EQUAL;
      }
    })
  })
}

export const getBackgroundCell = (status: CellStatus): string => {
  let bgColor = '';
  if(status === CellStatus.NORMAL){
    bgColor = 'bg-cell-status-normal';
  }
  if(status === CellStatus.SELECTED){
    bgColor = 'bg-cell-status-selected';
  }
  if(status === CellStatus.EQUAL){
    bgColor = 'bg-cell-status-equal';
  }
  if(status === CellStatus.SHADING){
    bgColor = 'bg-cell-status-shading';
  }
  if(status === CellStatus.ERROR){
    bgColor = 'bg-cell-status-error';
  }
  return bgColor;
}

export const getBorderCell = (cell: Cell): string => {
  let classNames = '';
  if(cell.col===0 || cell.col===3|| cell.col===6){
    classNames +='border-l-2 border-l-black '
  }
  if(cell.col===8){
    classNames +='border-r-2 border-r-black  '
  }

  if(cell.row===0 || cell.row===3|| cell.row===6){
    classNames +='border-t-2 border-t-black '
  }
  if(cell.row===8){
    classNames +='border-b-2 border-b-black '
  }
  return classNames;
}

export const getColorCell = (cellStatus: CellValueStatus): string => {
  let classNames = '';
  if(cellStatus === CellValueStatus.DEFAULT){
  }
  if(cellStatus === CellValueStatus.CORRECT){
    classNames +='text-sky-400'
  }
  if(cellStatus === CellValueStatus.INCORRECT){
    classNames +='text-red-600'
  }
  return classNames;
}