import { Ingredient } from "@prisma/client";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import FoodRemoveDialog from "./food-remove-dialog";

export default function IngredientListAdded({
  ingredientsAdded,
  removeIngredientFromRecipe,
}: {
  ingredientsAdded: Ingredient[];
  removeIngredientFromRecipe: (id: string) => void;
}) {
  return (
    <ScrollArea>
      <ul>
        {ingredientsAdded.map((ingredient, index) => (
          <li key={ingredient.id} className="relative">
            <div className="flex items-center">
              <button className="w-full p-1 text-left transition-colors hover:bg-secondary/50">
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
              <FoodRemoveDialog
                id={ingredient.id}
                name={ingredient.name}
                removeIngredientFromRecipe={removeIngredientFromRecipe}
              />
            </div>
            {index < ingredientsAdded.length - 1 && <Separator />}
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
