import { Board, BoardGame, Cell } from "@/model/entities";
import { DIFFICULTS } from "../model/enums";
import { useSudokuFunctions } from "@/hooks/useSudokuFunctions";
import NavbarComponent from "@/components/Navbar";
import GameComponent from "@/components/Game";

export default function Home() {
  const difficult: DIFFICULTS = DIFFICULTS.NORMAL;

  const { generateSudoku, getBoardGame,print } = useSudokuFunctions();

  const boardComplete: Board = generateSudoku(difficult);
  const boardGame: BoardGame = getBoardGame(structuredClone(boardComplete),difficult);

  print(boardComplete, boardGame);

  return (
    <div className="h-full min-w-full flex flex-col lg:flex-row">
        <GameComponent
          initialBoard={boardGame}
          initialBoardComplete={boardComplete}
        />
    </div>
  );
}
