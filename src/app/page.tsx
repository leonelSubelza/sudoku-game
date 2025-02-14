"use client"

import { Board, BoardGame } from "@/model/entities";
import { useSudokuFunctions } from "@/hooks/useSudokuFunctions";
import GameComponent from "@/components/Game";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {

  const { getDifficultChosen } = useLocalStorage();
  // const difficult: DIFFICULTS = DIFFICULTS.NORMAL;

  const { generateSudoku, getBoardGame } = useSudokuFunctions();

  const boardComplete: Board = generateSudoku(getDifficultChosen());
  const boardGame: BoardGame = getBoardGame(structuredClone(boardComplete),getDifficultChosen());

  // print(boardComplete, boardGame);

  return (
    <div className="h-full min-w-full flex flex-col lg:flex-row">
        <GameComponent
          initialBoard={boardGame}
          initialBoardComplete={boardComplete}
        />
    </div>
  );
}