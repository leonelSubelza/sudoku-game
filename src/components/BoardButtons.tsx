"use client"

import { gameStateContext, GameStateContextType } from '@/contexts/gameStateContext';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const numbers: number[] = [1,2,3,4,5,6,7,8,9]

interface Props {
  onButtonPressed: (value: number) => void;
}

function BoardButtons({onButtonPressed}: Props) {
  const { numberCounter } = useContext(gameStateContext) as GameStateContextType;

  return ( 
    <div className="flex flex-wrap mx-auto w-full max-w-full justify-evenly select-none
    lg:grid grid-cols-3 lg:aspect-square">
      {
        numbers.map( (value: number, index: number) => (
          <button key={uuidv4()} className={`${numberCounter[index] && numberCounter[index] === 9 && 'opacity-0'} w-10 h-10 p-1 mt-1 border border-slate-200 rounded-md 
          hover:bg-slate-100 dark:hover:bg-slate-800 flex justify-center items-center text-xl
          lg:m-2 lg:p-2 lg:m-auto lg:mx-auto lg:my-2 lg:aspect-square lg:w-[80%] lg:h-[80%]`}
          onClick={()=>onButtonPressed(value)}
          >
            <p>{value===0 ? '' : value}</p>
          </button>
        ))
      }
    </div>
   );
}

export default BoardButtons;