"use client"

import NavItemDifficultDropdownComponent from "./NavItemDifficultDropdown";
import { useContext } from "react";
import { gameStateContext, GameStateContextType } from "@/contexts/gameStateContext";
import NavItemSudokuOptions from "./NavItemSudokuOptions";
import Chronometer from "./Chronometer";

// interface Props {
//   difficult: string;
// }

function NavbarComponent() {
  const { errors } = useContext(gameStateContext) as GameStateContextType;

  return (
      <nav className="flex w-full">
        <div className="flex flex-wrap w-full items-center justify-between my-auto ml-0 mr-auto 
        md:w-full 
        lg:w-[60%] lg:mt-auto">
          <div className="flex justify-center items-center select-none p-1">
            {/* <h1>Sudoku</h1> */}
            <NavItemSudokuOptions />
          </div>

          <div className="flex select-none p-1">
            <NavItemDifficultDropdownComponent />
          </div>

          <div className="flex justify-center items-center text-sm/6 font-semibold select-none p-1">
            <Chronometer />
          </div>
          <div className="flex justify-center items-center text-sm/6 font-semibold select-none p-1">
          <span>Errores:</span><span className="font-bold ml-1">{errors}</span>
          </div>

          {/* <div className="flex justify-center items-center text-sm/6 p-1">
            <Button variant="default" className="">
              Nueva Partida
            </Button>
          </div>
          <div className="flex justify-center items-center text-sm/6 p-1">
            <ModeToggle />
          </div> */}
        </div>
          
      </nav>
  );
}

export default NavbarComponent;
