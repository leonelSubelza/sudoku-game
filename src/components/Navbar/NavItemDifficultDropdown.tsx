"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useContext, useState } from "react";
import { gameStateContext, GameStateContextType } from "@/contexts/gameStateContext";
import { DIFFICULTS, GameStatus } from "@/model/enums";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const getDifficultName = (difficult: DIFFICULTS): string => {
  let ret = '';
  if(difficult === DIFFICULTS.EASY) ret="Fácil"
  if(difficult === DIFFICULTS.NORMAL) ret="Normal"
  if(difficult === DIFFICULTS.HARD) ret="Dificil"
  return ret;
}

// interface Props {
//   difficult: string;
// }

function NavItemDifficultDropdownComponent() {
  const { difficult, setDifficult,setGameState } = useContext(gameStateContext) as GameStateContextType;

  const [difficultChosenAux,setDifficultChosenAux] = useState<DIFFICULTS>(difficult);

  const { setDifficultChosen } = useLocalStorage();

  const handleNewGame = () => {
    setDifficult(difficultChosenAux);
    setGameState(GameStatus.NEW_GAME);
    setDifficultChosen(difficultChosenAux);
  }

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        {/* <Button variant={"outline"} className="">Dificultad: {getDifficultName(difficult)}</Button> */}
          <Button 
          variant="ghost"
          >
            {getDifficultName(difficult)}<ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuSeparator /> */}

          <DropdownMenuItem onClick={() => setDifficultChosenAux(DIFFICULTS.EASY)}>
            <AlertDialogTrigger>Fácil</AlertDialogTrigger>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setDifficultChosenAux(DIFFICULTS.NORMAL)}>
            <AlertDialogTrigger>Medio</AlertDialogTrigger>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setDifficultChosenAux(DIFFICULTS.HARD)}>
            <AlertDialogTrigger>Dificil</AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            El progreso actual se perderá.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleNewGame}
          >
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default NavItemDifficultDropdownComponent;