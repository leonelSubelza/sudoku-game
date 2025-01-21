import BoardComponent from "@/components/Board";
import { Board, BoardGame, generateSudoku, getBoardGame,} from "@/utils/sudoku";
import { DIFFICULTS } from "./model/enums";

export default function Home() {
  const difficult: DIFFICULTS = DIFFICULTS.NORMAL;

  const boardComplete: Board = generateSudoku(difficult);
  const boardGame: BoardGame = getBoardGame(structuredClone(boardComplete),difficult);

  return (
      <div className="min-h-dvh min-w-full flex flex-col">
        <div className="flex flex-col w-full lg:w-6/12 m-auto">
          <BoardComponent initialBoard={boardGame} initialBoardComplete={boardComplete}/>
        </div>
      </div>
  );
}
