"use client"

import { Board, BoardGame, Cell } from "@/model/entities";
import { useContext, useEffect, useState } from "react";
import { CellStatus, CellValueStatus, GameStatus } from "@/model/enums";
// import { getBackgroundCell, getBorderCell, getColorCell, resetCellColors, updateEqualsValues, updateRowAndColRelated } from "@/utils/cell.utils";
import { generateSudoku, getBoardGame, isCellValuePreviouslyCorrect, isCorrect } from '@/utils/sudoku';
import { Dialog, DialogTrigger } from "./ui/dialog";
import DialogBoardComponent from "./DialogBoard";
import { Button } from "./ui/button";
import { gameStateContext, GameStateContextType } from "@/contexts/gameStateContext";
import { useCellFunctions } from "@/hooks/useCellFunctions";
import { useSudokuFunctions } from "@/hooks/useSudokuFunctions";
import NavbarComponent from "./Navbar/Navbar";
import BoardComponent from "./Board";
import BoardNumbersButtons from "./BoardNumbersButtons";
import BoardButtons from "./BoardButtons";

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

function GameComponent({initialBoard, initialBoardComplete }: Props) {
  // const { print, generateSudoku, getBoardGame, isCellValuePreviouslyCorrect, isCorrect } = useSudokuFunctions();
  
  const [board, setBoard] = useState<BoardGame>(initialBoard);
  const [boardInitialValue, setBoardInitialValue] = useState<BoardGame>(structuredClone(initialBoard));
  const [boardComplete, setBoardComplete] = useState<Board>(initialBoardComplete);
  
  const [cellActive, setCellActive] = useState<Cell>();
  
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  
  const {
    difficult,
    errors,
    setErrors,
    setTime,
    contHelps,
    setContHelps,
    numberCounter,
    setNumberCounter,
    gameState,
    setGameState,
    inputStack, setInputStack,
    showNotes, setShowNotes,
  } = useContext(gameStateContext) as GameStateContextType;
  
  const {
    getBackgroundCell,
    getBorderCell,
    getColorCell,
    resetCellColors,
    updateEqualsValues,
    updateRowAndColRelated,
    isANumber,
  } = useCellFunctions();

  const { showCorrectValue,getActualNumberCounter,isCorrectAndDefaultValue } = useSudokuFunctions();

  const updateNewCellActive = (cell: Cell) => {
    resetCellColors(board);

    board[cell.row][cell.col].status = CellStatus.SELECTED;
    // updateRowAndColRelated(board,cell);
    if(cell.value !== 0){
      updateEqualsValues(board,cell);
    }
    setBoard([...board]);
    setCellActive(board[cell.row][cell.col]);
  }

  const cleanNotesInLineAndRow = (newValue: number) => {
    if(!cellActive) return;

    console.log("SE BORRA NOTAS IGUAELS A "+newValue);
    
    // Delete all the same numbers in the col
    for(let i=0; i<9; i++) {
      board[cellActive.row][i].notes = board[cellActive.row][i].notes.map( (value: number) => value=== newValue ? 0 : value);
    }

    // Delete all the same numbers in the row
    for(let j=0; j<9; j++) {
      board[j][cellActive.col].notes = board[j][cellActive.col].notes.map( (value: number) => value=== newValue ? 0 : value);
    }


  }

  const handleCellClick = (event: any, cell: Cell) => {
    event.preventDefault();
    updateNewCellActive(cell);
  }

  const handleUndoAction = () => {
    const lastAction: Cell|undefined = inputStack.at(-1);
    console.log("lastAction");
    console.log(lastAction);
    
    if(!lastAction) return;

    board[lastAction.row][lastAction.col] = lastAction;
    if(isCorrect(boardComplete,lastAction,lastAction.value)) {
      
      numberCounter[lastAction.value-1]++;
      setNumberCounter([...numberCounter]);
    }

    setBoard([...board]);
    inputStack.filter( (c:Cell) => c!==lastAction );
    setInputStack([...inputStack]);
  }

  const deleteSelectedValue = () => {
    console.log("delete");
    console.log(cellActive);
    
    if(cellActive&& (cellActive.valueStatus === CellValueStatus.INCORRECT || 
        !isCorrectAndDefaultValue(board,boardComplete,cellActive)) ) {
      // No hace falta borrar el numberCounter porque solo se puede borrar un valor incorrecto, el cual no afectó
      // previamente al numberCounter
      // numberCounter[cellActive.value-1]--;
      // setNumberCounter([...numberCounter]);

      cellActive.value = 0;
      cellActive.notes = [];
      board[cellActive.row][cellActive.col].value = 0;
      board[cellActive.row][cellActive.col].notes = [];
      cellActive.valueStatus = CellValueStatus.DEFAULT;

      setBoard([...board]);
      setCellActive(cellActive);

      inputStack.push(cellActive)
      setInputStack([...inputStack]);
    }
  }

  const setNoteValue = (value: number) => {
    if(cellActive) {
      if(board[cellActive.row][cellActive.col].notes[value-1] === value){
        cellActive.notes[value-1] = 0;
        board[cellActive.row][cellActive.col].notes[value-1] = 0;
      } else{
        cellActive.notes[value-1] = value;
        board[cellActive.row][cellActive.col].notes[value-1] = value;

        cellActive.value = 0;
        board[cellActive.row][cellActive.col].value = 0;
      }
      setCellActive(cellActive);
      setBoard([...board]);
    }
  }

  const updateCellValue = (newValue: string|number) => {

    if(showNotes && isANumber(newValue as string)) {
      setNoteValue(Number.parseInt(newValue as string));
      return;
    }

    if(isANumber(newValue as string) && cellActive && newValue !== '0' && numberCounter[newValue as number-1] !== 9 ){
      newValue = Number.parseInt(newValue as string);

      cellActive.notes = [];
      board[cellActive.row][cellActive.col].notes = [];

      cellActive.value = newValue;
      board[cellActive.row][cellActive.col].value = newValue;

      if(isCorrect(boardComplete,cellActive,newValue)) {
        // cleanNotesInLineAndRow(newValue);

        cellActive.valueStatus = CellValueStatus.CORRECT;
        cellActive.status = CellStatus.NORMAL;
        numberCounter[newValue-1]++;
        setNumberCounter([...numberCounter]);

        // console.log("valor correcto:");
        // console.log(cellActive);
        // console.log("numberCounter: ");
        // console.log(numberCounter);
        
        
      }else{
        setErrors(errors+1);
        cellActive.valueStatus = CellValueStatus.INCORRECT ;
        cellActive.status = CellStatus.ERROR;
      }
      inputStack.push(cellActive)
      setInputStack([...inputStack]);
    }
    if((newValue === 'Backspace' || newValue === '0') && cellActive){
      deleteSelectedValue();
      
    }
    if(cellActive) updateNewCellActive(cellActive);
    setCellActive(cellActive);
    setBoard([...board]);
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    let keyPressed: string|number = event.key;
    if(cellActive && !isCellValuePreviouslyCorrect(boardComplete,cellActive)){
      updateCellValue(keyPressed);
    }
    if(keyPressed.toUpperCase() === 'H') {
      setContHelps(contHelps-1);
    }
  };

  const handleBoardButtonPressed = (value: number) => {
    if(cellActive && !isCellValuePreviouslyCorrect(boardComplete,cellActive)){
      updateCellValue(value.toString());
    }
  }

  const finishGame = () => {
    setIsOpenDialog(true);
    setGameState(GameStatus.FINISHED);
  }

  const resetGame = () => {
    let boardC: Board = generateSudoku(difficult);
    let boardG: BoardGame = getBoardGame(structuredClone(boardC),difficult);

    if(gameState === GameStatus.RESET) {
      boardC = boardComplete;
      boardG = boardInitialValue;
    }
    if(gameState === GameStatus.NEW_GAME) {
      boardC = generateSudoku(difficult);
      boardG = getBoardGame(structuredClone(boardC),difficult);
    }
    
    setBoardComplete([...boardC]);
    setBoard([...boardG])
    setBoardInitialValue(structuredClone(boardG));
    setNumberCounter(getActualNumberCounter(boardG));
    setTime('00:00:00');
    setContHelps(3);
    setErrors(0);
    setGameState(GameStatus.PLAYING);

    // console.log("BoardComplete");
    // console.log(boardC);
    // console.log("BoardGame");
    // console.log(boardG);
    
  }


  const handleShowHelp = () => {
    if(contHelps===3) return;
    const correctValue: Cell|undefined = showCorrectValue(boardComplete,board);
    if(correctValue) {
      numberCounter[correctValue.value-1]++;
      board[correctValue.row][correctValue.col].notes = [];
      board[correctValue.row][correctValue.col].status = CellStatus.NORMAL;
      board[correctValue.row][correctValue.col].valueStatus = CellValueStatus.DEFAULT;
      setNumberCounter([...numberCounter]);
      setBoard([...board]);
      updateNewCellActive(board[correctValue.row][correctValue.col]);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [cellActive,errors]);

  // it is activated when help button is pressed
  useEffect(()=> handleShowHelp() ,[contHelps])

  useEffect(() => {
    if(gameState === GameStatus.RESET || gameState === GameStatus.NEW_GAME) {
      resetGame();
    }

  },[gameState])

  useEffect(() => {
    let allNumberUsed = true;
    numberCounter.forEach( (value: number) => allNumberUsed = allNumberUsed && value===9 );
    if(allNumberUsed) {
      finishGame();
      // console.log("juego terminado");
    }else{
      // console.log("numberCounter:");
      // console.log(numberCounter);
    }
    
  },[numberCounter])

  useEffect(() => {
    setNumberCounter(getActualNumberCounter(board));
  },[])


  return (
    <>
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogTrigger asChild>
        <Button variant="outline">Dialog</Button>
      </DialogTrigger> 
        <div className="flex flex-col m-auto w-[98%] m-h-dvh h-full
        md:w-[60%] md:h-auto
        lg:w-[60%] "
        >
          <NavbarComponent />

          <div className="flex flex-col w-full m-auto items-center content-center
           lg:flex-row lg:h-auto lg:mx-auto lg:mt-3 lg:mb-auto"
          >
            <BoardComponent boardGame={board} onCellClick={handleCellClick} />

            <div className="flex flex-col w-full mx-auto my-2 mx-auto 
    lg:flex-col-reverse lg:w-[40%] lg:my-auto lg:mr-auto lg:ml-3"
            >
              <BoardButtons 
              onDeleteValue={deleteSelectedValue} 
              onUndoValue={handleUndoAction}
              />
              <BoardNumbersButtons onButtonPressed={handleBoardButtonPressed} />
            </div>
          </div>
        </div>

        {/* Dialog que aparece cuando termina el juego */}
        <DialogBoardComponent />
      </Dialog>
    </>
  );
}

export default GameComponent;