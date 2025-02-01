"use client"

import { gameStateContext, GameStateContextType } from '@/contexts/gameStateContext';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from './ui/button';

const numbers: number[] = [1,2,3,4,5,6,7,8,9]

interface Props {
  onButtonPressed: (value: number) => void;
}

function BoardNumbersButtons({onButtonPressed}: Props) {
  const { numberCounter,showNotes } = useContext(gameStateContext) as GameStateContextType;

  return ( 
    <div className="flex mx-auto w-full max-w-full justify-evenly select-none
    lg:grid grid-cols-3 lg:aspect-square lg:gap-0 lg:w-[65%]">
      {
        numbers.map( (value: number, index: number) => (
          // <button key={uuidv4()} className={`${numberCounter[index] && numberCounter[index] === 9 && 'opacity-0'} w-10 h-10 p-1 mt-1 border border-slate-300 rounded-sm font-semmibold
          // hover:bg-slate-100 dark:hover:bg-slate-800 flex justify-center items-center text-xl
          // lg:p-2 lg:aspect-square lg:w-auto lg:h-auto lg:mt-0`}
          // onClick={()=>onButtonPressed(value)}
          // disabled={numberCounter[index] === 9}
          // >
          //   <p>{value===0 ? '' : value}</p>
          // </button>
          <Button variant="outline"  key={uuidv4()} className={`${numberCounter[index] && numberCounter[index] === 9 && !showNotes && 'opacity-0'} w-10 h-10 p-1 mt-1 font-semmibold text-xl
          dark:border-gray-400
          lg:p-2 lg:aspect-square lg:w-auto lg:h-auto lg:mt-0`}
          onClick={()=>onButtonPressed(value)}
          disabled={numberCounter[index] === 9 && !showNotes}
          >
            <p>{value===0 ? '' : value}</p>
          </Button>
        ))
      }
    </div>
   );
}

export default BoardNumbersButtons;