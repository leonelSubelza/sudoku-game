"use client"

import { DIFFICULTS } from "@/app/model/enums";
import React, { ReactNode, useContext, useState } from "react";

export type GameStateContextType = {
  difficult: DIFFICULTS,setDifficult: (value: DIFFICULTS)=> void,
  errors: number, setErrors: (value: number)=> void,
  time: string, setTime: (value: string)=> void,
  contHelps: number, setContHelps: (value: number)=> void,
}

interface GameStateProviderProps {
  children: ReactNode;
}

export const gameStateContext = React.createContext<GameStateContextType|{}>({});

export function useGameStateContext() {
  return useContext(gameStateContext);
}

export function GameStateContext({children}: GameStateProviderProps) {
  const [difficult,setDifficult] = useState<DIFFICULTS>(DIFFICULTS.NORMAL);
  const [errors, setErrors] = useState<number>(0);
  const [time, setTime] = useState<string>('00:00:00');
  const [contHelps, setContHelps] = useState<number>(3);

  return (
    <gameStateContext.Provider
        value={{
          difficult,setDifficult,
          errors, setErrors,
          time, setTime,
          contHelps, setContHelps,
        }}
    >
        {children}
    </gameStateContext.Provider>
  )
}