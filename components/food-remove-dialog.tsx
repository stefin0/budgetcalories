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
import { removeFoodEaten } from "@/lib/actions";

export default function FoodRemoveDialog({
  id,
  name,
}: {
  id: string;
  name: string;
}) {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" className="absolute right-0 mr-1 w-20">
          Remove
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[95vw] max-w-[27rem] rounded-lg">
        <AlertDialogHeader className="px-1 text-left">
          <AlertDialogTitle>Remove Food Entry?</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove the {name} entry from what you ate today.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="grid grid-cols-2 gap-4">
          <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              removeFoodEaten(id);
            }}
          >
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
