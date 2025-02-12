import { gameStateContext, GameStateContextType } from '@/contexts/gameStateContext';
import { useCellFunctions } from '@/hooks/useCellFunctions';
import { BoardGame, Cell } from '@/model/entities';
import { CellStatus, CellValueStatus, GameStatus } from '@/model/enums';
import { CirclePlay } from 'lucide-react';
import { PT_Sans } from 'next/font/google';
import React, { useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: '400'
})

interface Props {
  boardGame: BoardGame;
  onCellClick: (event: React.MouseEvent<HTMLDivElement>, cell: Cell)=> void;
}


const getBackgroundCell = (status: CellStatus): string => {
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

const getBorderCell = (cell: Cell): string => {
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

const getColorCell = (cellStatus: CellValueStatus): string => {
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


function BoardComponent( {boardGame, onCellClick}: Props ) {
  const {
    gameState, setGameState
  } = useContext(gameStateContext) as GameStateContextType;
  
  const numbers: number[] = [1,2,3,4,5,6,7,8,9]

  const getCellClasses = (cell: Cell) => {
    return gameState !== GameStatus.PAUSED
    ? `${getBorderCell(cell)} ${getBackgroundCell(cell.status)} ${getColorCell(cell.valueStatus)}`
    : '';
  }
  

  return (
    <div
      className="relative grid grid-cols-9 w-full gap-0 m-auto aspect-square select-none
    md:w-[80%]
    lg:w-[60%]

"
    >
      {/* Tablero completo de 81 cuadrados */}
      {boardGame &&
        boardGame.map((row: Cell[]) =>
          row.map((cell: Cell) => (
            // Para lo responsive primero se pone los estilos en mobile, y luego con lg: ->todo lo que venga será en window view

            <div
              key={uuidv4()}
              className={`flex relative justify-center items-center bg-cell-background aspect-square border rounded-xs w-auto h-auto text-center content-center items-center cursor-pointer text-lg ${getCellClasses(cell)}
                
            md:text-xl lg:text-xl`}
              onClick={(event) => onCellClick(event, cell)}
            >
              <span>
                {cell.value !== 0 && gameState !== GameStatus.PAUSED
                  ? cell.value
                  : ""}
              </span>

              {/* Notes */}
              <div className="absolute grid grid-cols-3 w-full h-full gap-0 m-auto aspect-square select-none text-slate-400 dark:text-slate-300">
                {numbers.map((value: number, index: number) => (
                  <div
                    key={value}
                    className={`flex justify-center items-center aspect-square text-[clamp(8px,2vw,12px)] overflow-hidden text-center whitespace-nowrap ${ptSans.className}`}
                  >
                    <span>
                      {cell.notes[index] && cell.notes[index] !== 0
                        ? value
                        : " "}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      {gameState === GameStatus.PAUSED && (
        <div
          className="absolute flex w-full h-full justify-center items-center
        md:w-full 
        lg:m-w-[60%] lg:ml-0 lg:mr-auto
        "
        >
          <CirclePlay className='hover:cursor-pointer size-[40px]' onClick={() => setGameState(GameStatus.PLAYING)} />
        </div>
      )}
    </div>
  );
}

export default BoardComponent;