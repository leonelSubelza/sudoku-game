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
import { Label } from "@/components/ui/label";

function DialogBoardComponent() {
  return ( 
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Juego completado</DialogTitle>
        <DialogDescription>
          Anyone who has this link will be able to view this.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <div className="grid flex-1 gap-2">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
        </div>
      </div>
      <DialogFooter className="sm:justify-start">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Nuevo juego
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
   );
}

export default DialogBoardComponent;