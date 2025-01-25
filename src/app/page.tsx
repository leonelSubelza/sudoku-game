import BoardComponent from "@/components/Board";
import { Board, BoardGame, Cell } from "@/model/entities";
import { DIFFICULTS } from "../model/enums";
import { useSudokuFunctions } from "@/hooks/useSudokuFunctions";

export default function Home() {
  const difficult: DIFFICULTS = DIFFICULTS.NORMAL;

  const { generateSudoku, getBoardGame,print } = useSudokuFunctions();

  const boardComplete: Board = generateSudoku(difficult);
  const boardGame: BoardGame = getBoardGame(structuredClone(boardComplete),difficult);

  print(boardComplete, boardGame);

  return (
    <div className="min-h-dvh min-w-full flex flex-col">
      <div className="flex flex-col w-full lg:w-6/12 m-auto">
        <BoardComponent
          initialBoard={boardGame}
          initialBoardComplete={boardComplete}
        />
      </div>
    </div>
  );
}
