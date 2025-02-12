"use client"
 
import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { gameStateContext, GameStateContextType } from "@/contexts/gameStateContext";
import { GameStatus } from "@/model/enums";
import { useContext } from "react";

function DialogBoardComponent() {
  const { time, errors,setGameState } = useContext(gameStateContext) as GameStateContextType;

  return ( 
    <DialogContent className="sm:max-w-md">
      <DialogHeader className="">
        <DialogTitle>Sudoku completado!</DialogTitle>
        <DialogDescription className="py-3">
          Has completado el juego en <strong>{time}</strong> con <b>{errors}</b> {`${errors===1 ? 'error.' : 'errores.'}`}
        </DialogDescription>
      </DialogHeader>
      {/* <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          Has completado el juego en {time} con {errors} errores.
        </div>
      </div> */}
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="default" onClick={() => setGameState(GameStatus.NEW_GAME)}>
            Nuevo juego
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={() => setGameState(GameStatus.RESET)}>
            Reiniciar
          </Button>
        </DialogClose>

      </DialogFooter>
    </DialogContent>
   );
}

export default DialogBoardComponent;