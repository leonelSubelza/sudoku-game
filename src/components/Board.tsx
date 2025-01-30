import { gameStateContext, GameStateContextType } from '@/contexts/gameStateContext';
import { useCellFunctions } from '@/hooks/useCellFunctions';
import { useSudokuFunctions } from '@/hooks/useSudokuFunctions';
import { BoardGame, Cell } from '@/model/entities';
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

function BoardComponent( {boardGame, onCellClick}: Props ) {
  const {
    showNotes
  } = useContext(gameStateContext) as GameStateContextType;
  

  const {
    getBackgroundCell,
    getBorderCell,
    getColorCell,
  } = useCellFunctions();

  const { showCorrectValue,getActualNumberCounter } = useSudokuFunctions();

  const numbers: number[] = [1,2,3,4,5,6,7,8,9]

  return (
    <div
      className="grid grid-cols-9 w-full gap-0 m-auto aspect-square select-none
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
              className={`flex relative justify-center items-center bg-cell-background aspect-square border rounded-xs w-auto h-auto text-center content-center items-center cursor-pointer text-lg ${getBorderCell(
                cell
              )} ${getBackgroundCell(cell.status)} ${getColorCell(
                cell.valueStatus
              )}
            md:text-xl lg:text-xl`}
              onClick={(event) => onCellClick(event, cell)}
            >
              <span>{cell.value !== 0 ? cell.value : ""}</span>

              <div className="absolute grid grid-cols-3 w-full h-full gap-0 m-auto aspect-square select-none text-slate-400 dark:text-slate-300">
                {numbers.map((value: number, index: number) => (
                  <div
                    key={value}
                    className={`flex justify-center items-center aspect-square text-[clamp(8px,2vw,12px)] overflow-hidden text-center whitespace-nowrap ${ptSans.className}`}
                  >
                    {cell.notes[index] && <span>{value}</span>}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
    </div>
  );
}

export default BoardComponent;