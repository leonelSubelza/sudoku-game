"use client"

import { ModeToggle } from "./mode-toggle";
import { Lightbulb } from "lucide-react";
import { Button } from "./ui/button";

import NavItemDifficultDropdownComponent from "./NavItemDifficultDropdown";
import { useContext } from "react";
import { gameStateContext, GameStateContextType } from "@/contexts/gameStateContext";

// interface Props {
//   difficult: string;
// }

function NavbarComponent() {
  const { time,errors,contHelps, setContHelps } = useContext(gameStateContext) as GameStateContextType;

  return (
    <header>
      <nav className="flex flex-wrap w-full lg:w-6/12 mx-auto justify-between">
        <div className="flex justify-center items-center select-none">
          <h1 >Sudoku</h1>
        </div>

        <div className="flex select-none">
          <NavItemDifficultDropdownComponent />
        </div>
        
        <div className="flex justify-center items-center text-sm/6 font-semibold select-none">
          <span>Tiempo: {time}</span>
        </div>
        <div className="flex justify-center items-center text-sm/6 font-semibold select-none">
          <span>Errores: {errors}</span>
        </div>
        <div className="flex justify-center items-center text-sm/6 font-semibold select-none">
          <Button variant="outline" size="icon" onClick={()=>setContHelps(contHelps-1)}>
            <Lightbulb />
          </Button>
          <span className="p-2">{contHelps}/3</span>
        </div>
        

        <ModeToggle />
      </nav>
    </header>
  );
}

export default NavbarComponent;
