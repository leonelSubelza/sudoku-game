import {
  CircleHelp,
  Grid2x2Plus,
  Menu,
  Moon,
  Palette,
  RotateCcw,
  Sun,
  SunMoon,
  Table,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { GameStateContextType, gameStateContext } from "@/contexts/gameStateContext";
import { GameStatus } from "@/model/enums";

export default function NavItemSudokuOptions() {
  const { setTheme } = useTheme();
  const router = useRouter();

  const { setGameState } = useContext(gameStateContext) as GameStateContextType;

  const [statusGameSelected, setStatusGameSelected] = useState<GameStatus>(GameStatus.PLAYING);
  const handleFinishGame = () => {
    setGameState(statusGameSelected);
  }

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="px-0">
            <Menu /> Sudoku
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Table />
                <span>Juego</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() => setStatusGameSelected(GameStatus.NEW_GAME)}
                  >
                    <Grid2x2Plus />
                    <AlertDialogTrigger>
                      <span>Nuevo Sudoku</span>
                    </AlertDialogTrigger>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => setStatusGameSelected(GameStatus.RESET)}
                  >
                    {/* <AlertDialogTrigger className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0"> */}
                    <RotateCcw />
                    <AlertDialogTrigger>
                      <span>Reiniciar</span>
                    </AlertDialogTrigger>
                    {/* </AlertDialogTrigger> */}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            {/* <DropdownMenuItem>
            <ModeToggle />
            <span>Tema</span>
          </DropdownMenuItem> */}

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Palette />
                <span>Tema</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun />
                    <span>Light</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon />
                    <span>Dark</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    <SunMoon />
                    <span>System</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuItem onClick={() => router.push("/rules")}>
              <CircleHelp />
              <span>Cómo jugar</span>
              {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </DropdownMenuGroup>
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
          <AlertDialogAction onClick={handleFinishGame}>
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
