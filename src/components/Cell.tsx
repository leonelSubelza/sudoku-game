"use client"

import { CellStatus } from "@/model/enums";
import { Cell } from "@/utils/sudoku";

interface Props {
  cell: Cell;
}

function CellComponent({cell}: Props) {


  return ( 
    <div className={`${cell.status===CellStatus.NORMAL?"border-slate-300":"border-blue-300"} w-14 h-14 border flex justify-center items-center cursor-pointer`}
    onClick={() => {
      alert("Se hizo click en "+cell.value)
      cell.status = CellStatus.SELECTED
    }}
    >
      <p className="text-center select-none">
      {cell.value===0?'':cell.value.toString()}
      </p>
    </div>
   );
}

export default CellComponent;
//w-14 h-14