"use client"

import { Board, BoardGame, Cell, isCellValuePreviouslyCorrect, isCorrect } from "@/utils/sudoku";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { CellStatus, CellValueStatus } from "@/app/model/enums";
import BoardButtons from "./BoardButtons";
import { getBackgroundCell, getBorderCell, getColorCell, resetCellColors, updateEqualsValues, updateRowAndColRelated } from "@/utils/cell.utils";

interface Props {
  initialBoard: BoardGame;
  initialBoardComplete: Board;
}

function BoardComponent({ initialBoard, initialBoardComplete }: Props) {

  const [board, setBoard] = useState<BoardGame>(initialBoard);
  const [boardComplete, setBoardComplete] = useState<Board>(initialBoardComplete);

  const [cellActive, setCellActive] = useState<Cell>();

  const updateNewCellActive = (cell: Cell) => {
    resetCellColors(board)

    board[cell.row][cell.col].status = CellStatus.SELECTED;
    
    updateRowAndColRelated(board,cell);
    if(cell.value !== 0){
      updateEqualsValues(board,cell);
    }
    setBoard([...board]);
    setCellActive(board[cell.row][cell.col]);
  }

  const handleCellClick = (event: any, cell: Cell) => {
    event.preventDefault();
    updateNewCellActive(cell);
  }

  const updateCellValue = (newValue: string|number) => {
    const numbers: string[] = ['0','1','2','3','4','5','6','7','8','9'];

    if(numbers.includes(newValue as string) && cellActive && newValue !== '0'){
      newValue = Number.parseInt(newValue as string);
      cellActive.value = newValue;
      board[cellActive.row][cellActive.col].value = newValue;

      cellActive.valueStatus = isCorrect(boardComplete,cellActive,newValue) 
      ? CellValueStatus.CORRECT 
      : CellValueStatus.INCORRECT 
    }
    if((newValue === 'Backspace' || newValue === '0') && cellActive){
      cellActive.value = 0;
      board[cellActive.row][cellActive.col].value = 0;
      cellActive.valueStatus = CellValueStatus.DEFAULT

    }
    if(cellActive) updateNewCellActive(cellActive);
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
    if(cellActive && !isCellValuePreviouslyCorrect(boardComplete,cellActive)){
      updateCellValue(keyPressed);
    }
  };

  const handleBoardButtonPressed = (value: number) => {
    if(cellActive && !isCellValuePreviouslyCorrect(boardComplete,cellActive)){
      updateCellValue(value.toString());
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
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
              className={`bg-cell-background aspect-square border  w-14 h-14 text-center content-center items-center cursor-pointer text-xl
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