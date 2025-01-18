import BoardComponent from "@/components/Board";
import BoardButtons from "@/components/BoardButtons";
import { Board, BoardSubgrids, generateSudoku, getSubgrids } from "@/utils/sudoku";

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
  const board: Board = generateSudoku(30);
  const boardSubgrids: BoardSubgrids = getSubgrids(board);

  printSudokuOg(board);
  
  console.log("Subgrids");
  console.log(boardSubgrids);
  
  

  return (
    <div className="min-h-dvh min-w-full flex flex-col">
      <div className="mx-auto">SUDOKU GAME</div>
      <div className="flex flex-col w-6/12 m-auto">
        <BoardComponent boardSubgrids={boardSubgrids} />
        <BoardButtons />
      </div>
      
    </div>
  );
}
