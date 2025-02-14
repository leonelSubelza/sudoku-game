"use client"

import { Board, BoardGame, Cell } from "@/model/entities";
import { useContext, useEffect, useState } from "react";
import { CellStatus, CellValueStatus, GameStatus } from "@/model/enums";
// import { getBackgroundCell, getBorderCell, getColorCell, resetCellColors, updateEqualsValues, updateRowAndColRelated } from "@/utils/cell.utils";
import { Dialog } from "./ui/dialog";
import DialogBoardComponent from "./DialogBoard";
import { gameStateContext, GameStateContextType } from "@/contexts/gameStateContext";
import { useCellFunctions } from "@/hooks/useCellFunctions";
import { useSudokuFunctions } from "@/hooks/useSudokuFunctions";
import NavbarComponent from "./Navbar/Navbar";
import BoardComponent from "./Board";
import BoardNumbersButtons from "./BoardNumbersButtons";
import BoardButtons from "./BoardButtons";

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
    showNotes,

    inputStack, setInputStack,
  } = useContext(gameStateContext) as GameStateContextType;
  
  const {
    resetCellColors,
    updateEqualsValues,
    isANumber,
  } = useCellFunctions();

  const {
    generateSudoku,
    isCorrect,
    getBoardGame,
    isCellValuePreviouslyCorrect,
    showCorrectValue,
    getActualNumberCounter,
    isCorrectAndDefaultValue,
  } = useSudokuFunctions();

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

  // const cleanNotesInLineAndRow = (newValue: number) => {
  //   if(!cellActive) return;

  //   console.log("SE BORRA NOTAS IGUAELS A "+newValue);
    
  //   // Delete all the same numbers in the col
  //   for(let i=0; i<9; i++) {
  //     board[cellActive.row][i].notes = board[cellActive.row][i].notes.map( (value: number) => value=== newValue ? 0 : value);
  //   }

  //   // Delete all the same numbers in the row
  //   for(let j=0; j<9; j++) {
  //     board[j][cellActive.col].notes = board[j][cellActive.col].notes.map( (value: number) => value=== newValue ? 0 : value);
  //   }


  // }

  const saveInputStackLastValue = (cell: Cell) => {
    if(!cell) return;
    inputStack.push(cell);
    setInputStack([...inputStack])
  }

  const handleCellClick = (event: any, cell: Cell) => {
    event.preventDefault();
    updateNewCellActive(cell);
  }

  const handleUndoAction = () => {    
    const lastAction: Cell|undefined = inputStack.at(-1);
    // console.log("lastAction");
    // console.log(lastAction);
    if(!lastAction) return;   
    
    if(cellActive && isCorrect(boardComplete,board[lastAction.row][lastAction.col],board[lastAction.row][lastAction.col].value)) {
      numberCounter[board[lastAction.row][lastAction.col].value-1]--;
      setNumberCounter([...numberCounter]);
    }

    updateNewCellValue(lastAction.value,lastAction);
    inputStack.pop();
    setInputStack([...inputStack]);
    // with the last value cleared, we set the second to last value as active
    updateNewCellActive(lastAction);
  }

  const deleteSelectedValue = () => {
    // console.log("delete");
    // console.log(cellActive);
    
    if(cellActive&& (cellActive.valueStatus === CellValueStatus.INCORRECT || 
        !isCorrectAndDefaultValue(board,boardComplete,cellActive)) ) {
      // No hace falta borrar el numberCounter porque solo se puede borrar un valor incorrecto, el cual no afectó
      // previamente al numberCounter
      // numberCounter[cellActive.value-1]--;
      // setNumberCounter([...numberCounter]);

      //save the prev value for the undo action
      saveInputStackLastValue(structuredClone(board[cellActive.row][cellActive.col]));
      
      cellActive.value = 0;
      cellActive.notes = [];
      cellActive.valueStatus = CellValueStatus.DEFAULT;
      board[cellActive.row][cellActive.col].value = 0;
      board[cellActive.row][cellActive.col].notes = [];
      
      setBoard([...board]);
      setCellActive(cellActive);
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

  const updateNewCellValue = ( newValue: number, activeCell: Cell) => {
    if(!activeCell) return;

    board[activeCell.row][activeCell.col].notes = [];
    board[activeCell.row][activeCell.col].value = newValue;
    
    if(isCorrect(boardComplete,activeCell,newValue)) {
      // cleanNotesInLineAndRow(newValue);
      
      
      board[activeCell.row][activeCell.col].valueStatus = CellValueStatus.CORRECT;
      board[activeCell.row][activeCell.col].status = CellStatus.NORMAL;

      numberCounter[newValue-1]++;
      setNumberCounter([...numberCounter]);    
      
    }else{
      setErrors(errors+1);
      board[activeCell.row][activeCell.col].valueStatus = CellValueStatus.INCORRECT ;
      board[activeCell.row][activeCell.col].status = CellStatus.ERROR;
    }
  }

  const updateCellValue = (newValue: string|number) => {
    if(showNotes && isANumber(newValue as string)) {
      setNoteValue(Number.parseInt(newValue as string));
      return;
    }

    if(isANumber(newValue as string) && cellActive && newValue !== '0' 
    && numberCounter[newValue as number-1] !== 9 ) {
      newValue = Number.parseInt(newValue as string);

      //save the prev value for the undo action
      saveInputStackLastValue(structuredClone(board[cellActive.row][cellActive.col]));
      updateNewCellValue(newValue,cellActive);
    }
    if((newValue === 'Backspace' || newValue === '0') && cellActive){
      deleteSelectedValue();
      
    }
    if(cellActive) updateNewCellActive(cellActive);
    // setCellActive(board[cellActive.row][cellActive.col]);
    setBoard([...board]);
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    let keyPressed: string|number = event.key;
    if(cellActive && !isCellValuePreviouslyCorrect(boardComplete,cellActive)){
      updateCellValue(keyPressed);
    }
    if(keyPressed.toUpperCase() === 'H' && contHelps>0) {
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
    setInputStack([]);
    setContHelps(3);
    setErrors(0);
    setGameState(GameStatus.PLAYING);

    // console.log("BoardComplete");
    // console.log(boardC);
    // console.log("BoardGame");
    // console.log(boardG);
    
  }


  const handleShowHelp = () => {
    if(contHelps===3 || contHelps === 0) return;
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
        {/* <DialogTrigger asChild>
        <Button variant="outline">Dialog</Button>
      </DialogTrigger>  */}
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