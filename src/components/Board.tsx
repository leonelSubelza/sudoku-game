"use client"

import { BoardGame, Cell } from "@/utils/sudoku";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { CellStatus } from "@/app/model/enums";
import BoardButtons from "./BoardButtons";

interface Props {
  initialBoard: BoardGame;
}

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

const getBackgroundCell = (status: CellStatus): string => {
  let bgColor = '';
  if(status === CellStatus.NORMAL){
    bgColor = '';
  }
  if(status === CellStatus.SELECTED){
    bgColor = 'bg-sky-200';
  }
  if(status === CellStatus.EQUAL){
    bgColor = 'bg-slate-300';
  }
  if(status === CellStatus.SHADING){
    bgColor = 'bg-slate-100';
  }
  if(status === CellStatus.ERROR){
    bgColor = 'bg-red-400';
  }
  return bgColor;
}

const getBorderCell = (cell: Cell): string => {
  let classNames = '';
  if(cell.col===0 || cell.col===3|| cell.col===6){
    classNames +='border-l-slate-500 '
  }
  if(cell.col===8){
    classNames +='border-r-slate-500  '
  }

  if(cell.row===0 || cell.row===3|| cell.row===6){
    classNames +='border-t-slate-500 '
  }
  if(cell.row===8){
    classNames +='border-b-slate-500 '
  }
  return classNames;
}

function BoardComponent({ initialBoard }: Props) {

  const [board, setBoard] = useState<BoardGame>(initialBoard);

  const handleCellClick = (event: any, cell: Cell) => {
    event.preventDefault();
    resetCellColors(board)

    board[cell.row][cell.col].status = CellStatus.SELECTED;
    updateRowAndColRelated(board,cell);
    if(cell.value !== 0){
      updateEqualsValues(board,cell);
    }
    setBoard([...board]);
  }



  return (
    <>
      <div className="grid grid-cols-9 gap-0 m-auto max-w-screen-md aspect-square select-none">
        {/* Tablero completo de 81 cuadrados */}
        {board.map((row: Cell[]) =>
          row.map((cell: Cell) => (
            <div
              key={uuidv4()}
              className={`
          aspect-square border border-slate-200 w-14 h-14 text-center content-center items-center cursor-pointer
          ${getBorderCell(cell)} 
          ${getBackgroundCell(cell.status)}
        `}
              onClick={(event) => handleCellClick(event,cell)}
            >
              {cell.value !== 0 ? cell.value : ""}
            </div>
          ))
        )}
      </div>
      <BoardButtons />
    </>
  );
}

export default BoardComponent;

/*    
      #f4f4f5
      */