import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import NutritionFacts from "./nutrition-facts";
import { Ingredient } from "@prisma/client";

export default function IngredientItemDialog(props: Ingredient) {
  const { name, quantity, unit, calories } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex w-full flex-col p-1 text-left transition-colors hover:bg-secondary/50">
          <span>{name}</span>
          <span className="text-sm text-muted-foreground">{calories} Cal.</span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[425px] rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription>
            Nutrition facts for {quantity} {unit} {name}
          </DialogDescription>
        </DialogHeader>
        <NutritionFacts formData={props} />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
