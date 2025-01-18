"use client"

import { BoardSubgrids } from "@/utils/sudoku";
import CellComponent from "./Cell";
import { v4 as uuidv4 } from 'uuid';

interface Props {
  boardSubgrids: BoardSubgrids;
}

function BoardComponent({ boardSubgrids  }: Props) {


  return ( 
    <div className="grid grid-cols-3 gap-2 p-4 mx-auto">
      {/*
      max-w-sm 

      {board.map( (row: number[], i: number) => (
        <div className="flex">
          {row.map( (element: number,j: number) => (
          <CellComponent key={i+"-"+j} value={element.toString()} />
        ))}
        </div>
        
      ))} */}


      {
        boardSubgrids.map( (subgrid: number[][]) => (
          <div key={uuidv4()} className="border border-slate-500"  >
              <div className="flex flex-col">
                {
                subgrid.map( (row: number[]) => (
                  <div key={uuidv4()} className="flex">
                    {
                      row.map( (element: number) => (
                        <CellComponent key={uuidv4()} value={element===0 ? '' : element.toString()} />
                      ) )
                    }
                  </div>
                  
                ))
                }
              </div>
          </div>
          
        ))
      }
    </div>
   );
}

export default BoardComponent;
