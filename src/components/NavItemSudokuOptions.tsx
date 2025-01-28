import {
  CircleHelp,
  Cloud,
  CreditCard,
  Github,
  Grid2x2Plus,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Moon,
  Palette,
  Plus,
  PlusCircle,
  RotateCcw,
  Settings,
  Sun,
  SunMoon,
  Table,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "next-themes";

export default function NavItemSudokuOptions() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
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
                <DropdownMenuItem>
                  <Grid2x2Plus />
                  <span>Nuevo Sudoku</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RotateCcw />
                  <span>Reiniciar</span>
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
                <DropdownMenuItem onClick={()=>setTheme("light")}>
                  <Sun />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setTheme("dark")}>
                  <Moon />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>setTheme("system")}>
                  <SunMoon />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuItem>
            <CircleHelp />
            <span>Cómo jugar</span>
            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
          </DropdownMenuItem>

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
