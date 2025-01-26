"use client"

import { gameStateContext, GameStateContextType } from '@/contexts/gameStateContext';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

const numbers: number[] = [0,1,2,3,4,5,6,7,8,9]

interface Props {
  onButtonPressed: (value: number) => void;
}

function BoardButtons({onButtonPressed}: Props) {
  const { numberCounter } = useContext(gameStateContext) as GameStateContextType;

  return ( 
    <div className="flex mx-auto flex-wrap">
      {
        numbers.map( (value: number, index: number) => (
          <button key={uuidv4()} className={`${numberCounter[index-1] && numberCounter[index-1] === 9 && 'opacity-0'} w-10 h-10 m-2 p-2 border border-slate-200 rounded-md 
          hover:bg-slate-100 dark:hover:bg-slate-800`}
          onClick={()=>onButtonPressed(value)}
          >
            {value===0 ? '' : value}
          </button>
        ))
      }
    </div>
   );
}

export default BoardButtons;