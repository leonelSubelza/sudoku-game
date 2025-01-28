"use client"

import { Board, BoardGame, Cell } from "@/model/entities";
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from "react";
import { CellStatus, CellValueStatus, GameStatus } from "@/model/enums";
import BoardButtons from "./BoardButtons";
// import { getBackgroundCell, getBorderCell, getColorCell, resetCellColors, updateEqualsValues, updateRowAndColRelated } from "@/utils/cell.utils";
import { generateSudoku, getBoardGame, isCellValuePreviouslyCorrect, isCorrect } from '@/utils/sudoku';
import { Dialog, DialogTrigger } from "./ui/dialog";
import DialogBoardComponent from "./DialogBoard";
import { Button } from "./ui/button";
import { gameStateContext, GameStateContextType } from "@/contexts/gameStateContext";
import { useCellFunctions } from "@/hooks/useCellFunctions";
import { useSudokuFunctions } from "@/hooks/useSudokuFunctions";
import { Eraser, Lightbulb, Pencil, Undo2 } from "lucide-react";
import NavbarComponent from "./Navbar";

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

function BoardComponent({initialBoard, initialBoardComplete }: Props) {
  // const { print, generateSudoku, getBoardGame, isCellValuePreviouslyCorrect, isCorrect } = useSudokuFunctions();
  
  const [board, setBoard] = useState<BoardGame>(initialBoard);
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
  } = useContext(gameStateContext) as GameStateContextType;
  
  const {
    getBackgroundCell,
    getBorderCell,
    getColorCell,
    resetCellColors,
    updateEqualsValues,
    updateRowAndColRelated,
  } = useCellFunctions();

  const { showCorrectValue,getActualNumberCounter } = useSudokuFunctions();

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
        numberCounter[newValue-1]++;
        setNumberCounter([...numberCounter]);

        console.log("valor correcto:");
        console.log(cellActive);
        console.log("numberCounter: ");
        console.log(numberCounter);
        
        
      }else{
        setErrors(errors+1);
        cellActive.valueStatus = CellValueStatus.INCORRECT ;
      }
    }
    if((newValue === 'Backspace' || newValue === '0') && cellActive){
      numberCounter[cellActive.value-1]--;
      setNumberCounter([...numberCounter]);

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
    console.log("se REINCIAI");
    const boardC: Board = generateSudoku(difficult);
    const boardG = getBoardGame(structuredClone(boardC),difficult);
    setBoardComplete([...boardC]);
    setBoard([...boardG])
    setTime('00:00:00');
    setContHelps(3);
    setNumberCounter(getActualNumberCounter(boardG));
    
    setGameState(GameStatus.PLAYING);

    console.log("BoardComplete");
    console.log(boardC);
    console.log("BoardGame");
    console.log(boardG);
    
  }

  const handleShowHelp = () => {
    if(contHelps===3) return;
    const correctValue = showCorrectValue(boardComplete,board);
    if(correctValue) {
      numberCounter[correctValue.value-1]++;
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

  useEffect(()=> handleShowHelp() ,[contHelps])

  useEffect(() => {
    if(gameState === GameStatus.RESET) {
      resetGame();
    }

  },[gameState])

  useEffect(() => {
    let allNumberUsed = true;
    numberCounter.forEach( (value: number) => allNumberUsed = allNumberUsed && value===9 );
    if(allNumberUsed) {
      finishGame();
      console.log("juego terminado");
    }else{
      console.log("numberCounter:");
      console.log(numberCounter);
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
      </DialogTrigger> lg:w-6/12 lg:max-w-screen-md*/}
        <div className="flex flex-col m-auto w-[98%] m-h-dvh h-full
        md:w-[60%] md:h-auto
        lg:w-[60%] ">
          <NavbarComponent />

          <div className="flex flex-col w-full m-auto items-center content-center
           lg:flex-row lg:h-auto lg:mx-auto lg:mt-3 lg:mb-auto">
            <div
              className="grid grid-cols-9 w-full gap-0 m-auto aspect-square select-none 
              md:w-[80%]
              lg:w-[60%]
 
"
            >
              {/* Tablero completo de 81 cuadrados */}
              {board &&
                board.map((row: Cell[]) =>
                  row.map((cell: Cell) => (
                    // Para lo responsive primero se pone los estilos en mobile, y luego con lg: ->todo lo que venga será en window view

                    <div
                      key={uuidv4()}
                      className={`bg-cell-background aspect-square border w-auto h-auto text-center content-center items-center cursor-pointer text-xl ${getBorderCell(
                        cell
                      )} ${getBackgroundCell(cell.status)} ${getColorCell(
                        cell.valueStatus
                      )}
      lg:w-full h-full
`}
                      onClick={(event) => handleCellClick(event, cell)}
                    >
                      {cell.value !== 0 ? cell.value : ""}
                    </div>
                  ))
                )}
            </div>


            <div className="flex flex-col w-full mx-auto pb-5 
        lg:flex-col-reverse lg:w-[40%] lg:my-auto lg:mr-auto lg:ml-3">
          <div className="flex w-full justify-center items-center justify-evenly ">
            <div className="flex flex-col justify-center items-center text-sm/6 font-semibold select-none p-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setContHelps(contHelps - 1)}
              >
                <Lightbulb />
              </Button>
              <span className="p-2">{contHelps}/3</span>
            </div>
            <div className="flex flex-col justify-center items-center text-sm/6 font-semibold select-none p-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setContHelps(contHelps - 1)}
              >
                <Pencil />
              </Button>
              <span className="p-2">Notas</span>
            </div>
            <div className="flex flex-col justify-center items-center text-sm/6 font-semibold select-none p-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setContHelps(contHelps - 1)}
              >
                <Undo2 />
              </Button>
              <span className="p-2">Deshacer</span>
            </div>

            <div className="flex flex-col justify-center items-center text-sm/6 font-semibold select-none p-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setContHelps(contHelps - 1)}
              >
                <Eraser />
              </Button>
              <span className="p-2">Borrar</span>
            </div>
          </div>

          <BoardButtons onButtonPressed={handleBoardButtonPressed} />
        </div>
          </div>



        </div>
  



        <DialogBoardComponent />
      </Dialog>
    </>
  );
}

export default BoardComponent;