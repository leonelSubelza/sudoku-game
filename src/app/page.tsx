
import { Board, BoardGame } from "@/model/entities";
import { useSudokuFunctions } from "@/hooks/useSudokuFunctions";
import GameComponent from "@/components/Game";
import { DIFFICULTS } from "@/model/enums";

export default function Home() {

  // const { getDifficultChosen } = useLocalStorage();
  const difficult: DIFFICULTS = DIFFICULTS.NORMAL;

  const { generateSudoku, getBoardGame } = useSudokuFunctions();

  const boardComplete: Board = generateSudoku();
  const boardGame: BoardGame = getBoardGame(structuredClone(boardComplete),difficult);
  // const boardGame: BoardGame = getBoardGame(structuredClone(boardComplete),getDifficultChosen());

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