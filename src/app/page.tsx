import BoardComponent from "@/components/Board";
import BoardButtons from "@/components/BoardButtons";
import { Board, BoardGame, BoardSubgrids, generateSudoku, getBoardGame, getSubgrids, removeNumbers } from "@/utils/sudoku";
import { DIFFICULTS } from "./model/enums";
import { GameStateContext } from "@/contexts/gameStateContext";

export function printSudokuOg(board: Board) {
  console.log("OG:");

  board.forEach( row => {
    let rowP = "";
    row.forEach( value => {
      rowP = rowP + value +", ";
    })
    console.log(rowP);
    
    rowP = "";
  })  
}


export default function Home() {
  const difficult: DIFFICULTS = DIFFICULTS.NORMAL;

  const boardComplete: Board = generateSudoku(difficult);
  const boardGame: BoardGame = getBoardGame(boardComplete,difficult);
  // const boardSubgrids: BoardSubgrids = getSubgrids(board);

  printSudokuOg(boardComplete);
  
  console.log("Subgrids");

  return (
      <div className="min-h-dvh min-w-full flex flex-col">
        <div className="flex flex-col w-full lg:w-6/12 m-auto">
          <BoardComponent initialBoard={boardGame} />
        </div>
        
      </div>
  );
}
