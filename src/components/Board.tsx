"use client"

import { Board, BoardGame, Cell, getBoardGame, isADefaultValue, isCorrect } from "@/utils/sudoku";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { CellStatus, CellValueStatus } from "@/app/model/enums";
import BoardButtons from "./BoardButtons";

interface Props {
  initialBoard: BoardGame;
  initialBoardComplete: Board;
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

const getColorCell = (cellStatus: CellValueStatus): string => {
  let classNames = '';
  if(cellStatus === CellValueStatus.DEFAULT){
  }
  if(cellStatus === CellValueStatus.CORRECT){
    classNames +='text-sky-600'
  }
  if(cellStatus === CellValueStatus.INCORRECT){
    classNames +='text-red-600'
  }
  return classNames;
}

function BoardComponent({ initialBoard, initialBoardComplete }: Props) {

  const [board, setBoard] = useState<BoardGame>(initialBoard);
  const [boardComplete, setBoardComplete] = useState<Board>(initialBoardComplete);

  const [cellActive, setCellActive] = useState<Cell>();

  const handleCellClick = (event: any, cell: Cell) => {
    event.preventDefault();
    resetCellColors(board)

    board[cell.row][cell.col].status = CellStatus.SELECTED;
    console.log("se hizo click sobre celda "+cell.value);
    
    
    updateRowAndColRelated(board,cell);
    if(cell.value !== 0){
      updateEqualsValues(board,cell);
    }
    setBoard([...board]);
    setCellActive(board[cell.row][cell.col]);
  }

  const updateCellValue = (newValue: string|number) => {
    const numbers: string[] = ['0','1','2','3','4','5','6','7','8','9'];

    if(numbers.includes(newValue as string) && cellActive && newValue !== '0' && !isADefaultValue(board,cellActive)){
      newValue = Number.parseInt(newValue as string);
      cellActive.value = newValue;
      board[cellActive.row][cellActive.col].value = newValue;

      cellActive.valueStatus = isCorrect(boardComplete,cellActive,newValue) 
      ? CellValueStatus.CORRECT 
      : CellValueStatus.INCORRECT 
    }
    if((newValue === 'Backspace' || newValue === '0') && cellActive && !isADefaultValue(board,cellActive)){
      cellActive.value = 0;
      board[cellActive.row][cellActive.col].value = 0;
      cellActive.valueStatus = CellValueStatus.DEFAULT

    }
    setCellActive(cellActive);
    setBoard([...board]);
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    let keyPressed: string|number = event.key;
    // console.log("cellActive "+cellActive?.value);
    // console.log("key "+keyPressed);
    // if(cellActive){
    //   console.log("es un valor por default?: "+isADefaultValue(board,cellActive));
    // }
    updateCellValue(keyPressed);
  };

  const handleBoardButtonPressed = (value: number) => {
    console.log("se pulso: "+value);
    if(!cellActive) return;

    updateCellValue(value.toString());
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    console.log("se act cell active");
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [cellActive]);

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
          ${getColorCell(cell.valueStatus)}
          }
        `}
              onClick={(event) => handleCellClick(event,cell)}
            >
              {cell.value !== 0 ? cell.value : ""}
            </div>
          ))
        )}
      </div>
      <BoardButtons onButtonPressed={handleBoardButtonPressed}/>
    </>
  );
}

export default BoardComponent;

/*    
      #f4f4f5
      */