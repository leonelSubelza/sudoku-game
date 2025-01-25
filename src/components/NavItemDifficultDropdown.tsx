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
} from "./ui/alert-dialog";
import { useContext, useState } from "react";
import { gameStateContext, GameStateContextType } from "@/contexts/gameStateContext";
import { DIFFICULTS } from "@/model/enums";

const getDifficultName = (difficult: DIFFICULTS): string => {
  let ret = '';
  if(difficult === DIFFICULTS.EASY) ret="Fácil"
  if(difficult === DIFFICULTS.NORMAL) ret="Normal"
  if(difficult === DIFFICULTS.HARD) ret="Dificil"
  return ret;
}

interface Props {
  difficult: string;
}

function NavItemDifficultDropdownComponent() {
  const { difficult, setDifficult } = useContext(gameStateContext) as GameStateContextType;

  const [difficultChosen,setDifficultChosen] = useState<DIFFICULTS>(difficult);

  const handleNewGame = () => {
    setDifficult(difficultChosen)
  }

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="">Dificultad: {getDifficultName(difficult)}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuSeparator /> */}

          <DropdownMenuItem onClick={() => setDifficultChosen(DIFFICULTS.EASY)}>
            <AlertDialogTrigger>Fácil</AlertDialogTrigger>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setDifficultChosen(DIFFICULTS.NORMAL)}>
            <AlertDialogTrigger>Medio</AlertDialogTrigger>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setDifficultChosen(DIFFICULTS.HARD)}>
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