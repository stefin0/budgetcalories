import IngredientItemDialog from "./ingredient-item-dialog";
import { Separator } from "./ui/separator";
import IngredientEatDialog from "./ingredient-eat-dialog";
import { useIngredientsContext } from "@/context/ingredient-context";

export default function IngredientList() {
  const ingredients = useIngredientsContext();

  return (
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
  );
}
