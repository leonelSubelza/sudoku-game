"use client"

import { Board, BoardGame, Cell, isCellValuePreviouslyCorrect, isCorrect } from "@/utils/sudoku";
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from "react";
import { CellStatus, CellValueStatus } from "@/app/model/enums";
import BoardButtons from "./BoardButtons";
// import { getBackgroundCell, getBorderCell, getColorCell, resetCellColors, updateEqualsValues, updateRowAndColRelated } from "@/utils/cell.utils";

import { Dialog, DialogTrigger } from "./ui/dialog";
import DialogBoardComponent from "./DialogBoard";
import { Button } from "./ui/button";
import { gameStateContext, GameStateContextType } from "@/contexts/gameStateContext";
import { useCellFunctions } from "@/hooks/useCellFunctions";

/*
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
  */

interface Props {
  initialBoard: BoardGame;
  initialBoardComplete: Board;
}

function BoardComponent({ initialBoard, initialBoardComplete }: Props) {

  const {errors,setErrors} = useContext(gameStateContext) as GameStateContextType;
  const [board, setBoard] = useState<BoardGame>(initialBoard);
  const [boardComplete, setBoardComplete] = useState<Board>(initialBoardComplete);

  const [cellActive, setCellActive] = useState<Cell>();

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { getBackgroundCell, getBorderCell, getColorCell, resetCellColors, updateEqualsValues, updateRowAndColRelated } = useCellFunctions();

  const updateNewCellActive = (cell: Cell) => {
    resetCellColors(board);

    board[cell.row][cell.col].status = CellStatus.SELECTED;
    
    updateRowAndColRelated(board,cell);
    if(cell.value !== 0){
      updateEqualsValues(board,cell);
    }
    setBoard([...board]);
    setCellActive(board[cell.row][cell.col]);
  }

  const handleCellClick = (event: any, cell: Cell) => {
    console.log("se hizo click sobre "+cell.value);
    
    event.preventDefault();
    updateNewCellActive(cell);
  }

  const updateCellValue = (newValue: string|number) => {
    const numbers: string[] = ['0','1','2','3','4','5','6','7','8','9'];

    if(numbers.includes(newValue as string) && cellActive && newValue !== '0'){
      newValue = Number.parseInt(newValue as string);
      cellActive.value = newValue;
      board[cellActive.row][cellActive.col].value = newValue;

      if(isCorrect(boardComplete,cellActive,newValue)) {
        cellActive.valueStatus = CellValueStatus.CORRECT;
      }else{
        setErrors(errors+1);
        cellActive.valueStatus = CellValueStatus.INCORRECT ;
      }
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
    event.preventDefault();
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
  }, [cellActive,errors]);

  return (
    <>
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline">Dialog</Button>
      </DialogTrigger>
      <div className="grid grid-cols-9 gap-0 m-auto max-w-screen-md aspect-square select-none">
        {/* Tablero completo de 81 cuadrados */}
        {board.map((row: Cell[]) =>
          row.map((cell: Cell) => (
            <div
              key={uuidv4()}
              className={`bg-cell-background aspect-square border w-14 h-14 text-center content-center items-center cursor-pointer text-xl ${getBorderCell(cell)} ${getBackgroundCell(cell.status)} ${getColorCell(cell.valueStatus)}
        `}
              onClick={(event) => handleCellClick(event,cell)}
            >
              {cell.value !== 0 ? cell.value : ""}
            </div>
          ))
        )}
      </div>
      <BoardButtons onButtonPressed={handleBoardButtonPressed}/>

      <DialogBoardComponent />
      </Dialog>
    </>
  );
}

export default BoardComponent;