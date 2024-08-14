import IngredientItemDialog from "./ingredient-item-dialog";
import { Separator } from "./ui/separator";
import IngredientEatDialog from "./ingredient-eat-dialog";
import { useIngredientsContext } from "@/context/ingredient-context";
import { ScrollArea } from "./ui/scroll-area";

export default function IngredientList() {
  const ingredients = useIngredientsContext();

  return (
    <ScrollArea>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={ingredient.id} className="relative">
            <div className="flex items-center">
              <IngredientItemDialog {...ingredient} />
              <IngredientEatDialog {...ingredient} />
            </div>
            {index < ingredients.length - 1 && <Separator />}
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
}
