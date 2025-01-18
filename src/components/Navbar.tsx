"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";

function NavbarComponent() {

  const [difficult, setDifficult] = useState<string>('Normal');

  const handleDifficultClick = (value: string) => {
    if(value === difficult) {
      return;
    }
    if(confirm("Está seguro que desea cambiar de dificultad. Esto reiniciará la partida")){
      setDifficult(value);
    }
  }

  return (
    <header>
      <nav className="flex flex-wrap w-full lg:w-6/12 mx-auto justify-between">
        <div className="flex justify-center align-center select-none">
          <h1>Sudoku</h1>
        </div>

        <div className="flex select-none">
          
          <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="">
              Dificultad: {difficult}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={() => handleDifficultClick('Fácil')}>Fácil</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDifficultClick('Medio')}>Medio</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDifficultClick('Dificil')}>Dificil</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        
        <div className="flex justify-center align-center text-sm/6 font-semibold text-gray-900 select-none">
          <span>Tiempo: 00:00</span>
        </div>
        <div className="flex justify-center align-center text-sm/6 font-semibold text-gray-900 select-none">
          <span>Errores: 0</span>
        </div>
      </nav>
    </header>
  );
}

export default NavbarComponent;
