import { Eraser, Lightbulb, Pencil, Undo2 } from "lucide-react";
import { Button } from "./ui/button";
import { gameStateContext, GameStateContextType } from "@/contexts/gameStateContext";
import { useContext } from "react";
import { Cell } from "@/model/entities";

interface Props {
  onDeleteValue: () => void;
  onUndoValue: () => void,
  onActiveNotes: () => void,
}

function BoardButtons( {onDeleteValue, onUndoValue,onActiveNotes}:Props ) {
  const {
    contHelps,
    setContHelps,
  } = useContext(gameStateContext) as GameStateContextType;

  return (

          <div className="flex flex-wrap w-full justify-center items-center justify-evenly lg:mt-2">
            <div className="flex flex-col justify-center items-center text-sm/6 font-semibold select-none p-1">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setContHelps(contHelps - 1)}
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
                onClick={onActiveNotes}
                className="lg:w-[55px] lg:h-[55px]"
              >
                <Pencil />
              </Button>
              <span className="p-2">Notas</span>
            </div>
            <div className="flex flex-col justify-center items-center text-sm/6 font-semibold select-none p-1">
              <Button
                variant="outline"
                size="icon"
                // onClick={() => onUndoValue()}
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
                onClick={() => onDeleteValue()}
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