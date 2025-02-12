"use client"

import { Cell } from "@/model/entities";
import { DIFFICULTS, GameStatus } from "@/model/enums";
import React, { ReactNode, useContext, useState } from "react";

export type GameStateContextType = {
  gameState: GameStatus, setGameState: (value: GameStatus) => void,
  difficult: DIFFICULTS,setDifficult: (value: DIFFICULTS)=> void,
  errors: number, setErrors: (value: number)=> void,
  time: string, setTime: (value: string)=> void,
  contHelps: number, setContHelps: (value: number)=> void,
  numberCounter: number[],setNumberCounter: (value: number[]) => void,
  showNotes: boolean, setShowNotes: (value: boolean) => void,

  inputStack: Cell[], setInputStack: (value: Cell[]) => void,
}

interface GameStateProviderProps {
  children: ReactNode;
}

export const gameStateContext = React.createContext<GameStateContextType>({} as GameStateContextType);

export function useGameStateContext() {
  return useContext(gameStateContext);
}

export function GameStateContext({children}: GameStateProviderProps) {

  const [gameState, setGameState] = useState<GameStatus>(GameStatus.PLAYING);
  const [difficult,setDifficult] = useState<DIFFICULTS>(DIFFICULTS.NORMAL);
  const [errors, setErrors] = useState<number>(0);
  const [time, setTime] = useState<string>('00:00:00');
  const [contHelps, setContHelps] = useState<number>(3);
  const [numberCounter,setNumberCounter] = useState<number[]>(Array(9).fill(0));
  const [showNotes, setShowNotes] = useState<boolean>(false);

  const [inputStack, setInputStack] = useState<Cell[]>([]);

  return (
    <gameStateContext.Provider
        value={{
          gameState, setGameState,
          difficult,setDifficult,
          errors, setErrors,
          time, setTime,
          contHelps, setContHelps,
          numberCounter,setNumberCounter,
          showNotes, setShowNotes,

          inputStack, setInputStack,
        }}
    >
        {children}
    </gameStateContext.Provider>
  )
}