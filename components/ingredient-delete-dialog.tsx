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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteIngredient } from "@/lib/actions";
import { Ingredient } from "@prisma/client";

interface IngredientDeleteDialogProps
  extends Pick<Ingredient, "id" | "quantity" | "unit" | "name"> {
  setOpen: (open: boolean) => void;
}

export default function IngredientDeleteDialog({
  id,
  quantity,
  unit,
  name,
  setOpen,
}: IngredientDeleteDialogProps) {
  async function handleDelete() {
    await deleteIngredient(id);
    setOpen(false);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[95vw] max-w-[27rem] rounded-lg">
        <AlertDialogHeader className="px-1 text-left">
          <AlertDialogTitle>Delete Ingredient?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            {quantity} {unit} <span className="break-all">{name}</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-2 gap-4">
          <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
