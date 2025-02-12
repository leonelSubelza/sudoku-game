import { Eraser, Lightbulb, Pencil, PencilOff, Undo2 } from "lucide-react";
import { Button } from "./ui/button";
import { gameStateContext, GameStateContextType } from "@/contexts/gameStateContext";
import { useContext } from "react";
import { GameStatus } from "@/model/enums";

interface Props {
  onDeleteValue: () => void;
  onUndoValue: () => void,
}

function BoardButtons( {onDeleteValue, onUndoValue}:Props ) {
  const {
    gameState,
    contHelps,
    setContHelps,
    showNotes,
    setShowNotes
  } = useContext(gameStateContext) as GameStateContextType;

  const handleHelpPressed = () => {
    if(gameState === GameStatus.PAUSED) return;
    setContHelps(contHelps - 1);
  }

  const handleNotesPressed = () => {
    if(gameState === GameStatus.PAUSED) return;
    setShowNotes(!showNotes);
  }

  const handleUndoPressed = () => {
    if(gameState === GameStatus.PAUSED) return;
    onUndoValue();
  }

  const handleDeletePressed = () => {
    if(gameState === GameStatus.PAUSED) return;
    onDeleteValue();
  }

  return (

          <div className="flex flex-wrap w-full justify-center items-center justify-evenly lg:mt-2">
            <div className="flex flex-col justify-center items-center text-sm/6 font-semibold select-none p-1">
              <Button
                variant="outline"
                size="icon"
                onClick={handleHelpPressed}
                className="lg:w-[55px] lg:h-[55px]"
              >
                <Lightbulb />
              </Button>
              <span className="p-2">{contHelps}/3</span>
            </div>
            <div className="flex flex-col justify-center items-center text-sm/6 font-semibold select-none p-1">
              <Button
                variant="outline"
                size="icon"
                onClick={handleNotesPressed}
                className={`${showNotes && 'bg-cell-status-selected hover:bg-cell-status-selected'} lg:w-[55px] lg:h-[55px]`}
              >
                {showNotes ? <Pencil /> : <PencilOff />}
              </Button>
              <span className="p-2">Notas</span>
            </div>
            <div className="flex flex-col justify-center items-center text-sm/6 font-semibold select-none p-1">
              <Button
                variant="outline"
                size="icon"
                onClick={handleUndoPressed}
                className="lg:w-[55px] lg:h-[55px]"
              >
                <Undo2 />
              </Button>
              <span className="p-2">Deshacer</span>
            </div>

            <div className="flex flex-col justify-center items-center text-sm/6 font-semibold select-none p-1">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDeletePressed}
                className="lg:w-[55px] lg:h-[55px]"
              >
                <Eraser />
              </Button>
              <span className="p-2">Borrar</span>
            </div>
          </div>


  )
}

export default BoardButtons