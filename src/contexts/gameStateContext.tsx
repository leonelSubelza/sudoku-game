import React, { ReactNode, useContext, useState } from "react";

export type GameStateContextType = {
  rowIndexActive: number,setRowIndexActive: (value: number)=> void,
  colIndexActive: number,setColIndexActive: (value: number)=> void,
}

interface GameStateProviderProps {
  children: ReactNode;
}

export const gameStateContext = React.createContext({});

export function useGameStateContext() {
    return useContext(gameStateContext);
}

export function GameStateContext({children}: GameStateProviderProps) {
  const [rowIndexActive,setRowIndexActive] = useState<number>(-1);
  const [colIndexActive,setColIndexActive] = useState<number>(-1);

  return (
    <gameStateContext.Provider
        value={{
          rowIndexActive,setRowIndexActive,
          colIndexActive,setColIndexActive,
        }}
    >
        {children}
    </gameStateContext.Provider>
  )
}