import { useIngredientsContext } from "@/context/ingredient-context";
import { Separator } from "./ui/separator";
import IngredientEatDialog from "./ingredient-eat-dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Ingredient } from "@prisma/client";

export default function IngredientListBuilder({
  addIngredientToRecipe,
}: {
  addIngredientToRecipe: (ingredient: Ingredient) => void;
}) {
  const ingredients = useIngredientsContext();

  return (
    <ScrollArea>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={ingredient.id} className="relative">
            <div className="flex items-center">
              <button
                className="w-full p-1 text-left transition-colors hover:bg-secondary/50"
              >
                <div className="flex w-2/3 items-baseline gap-1">
                  <p className="truncate">{ingredient.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {ingredient.quantity}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {ingredient.unit}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {ingredient.calories} Cal.
                </p>
              </button>
              <IngredientEatDialog {...ingredient} addIngredientToRecipe={addIngredientToRecipe} />
            </div>
            {index < ingredients.length - 1 && <Separator />}
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
