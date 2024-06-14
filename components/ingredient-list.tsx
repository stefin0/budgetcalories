import { auth } from "@/auth";
import { fetchIngredients } from "@/lib/data";
import { Ingredient } from "@prisma/client";
import IngredientItemDialog from "./ingredient-item-dialog";
import { Separator } from "./ui/separator";
import IngredientEatDialog from "./ingredient-eat-dialog";

export default async function IngredientList() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return <p>Please sign in to view your ingredients</p>;
  }

  const userId = session.user.id;

  const ingredients: Ingredient[] = await fetchIngredients(userId);

  return (
    <ul>
      {ingredients.map((ingredient, index) => (
        <li key={ingredient.id} className="relative">
          <div className="flex items-center">
            <IngredientItemDialog {...ingredient} />
            <IngredientEatDialog />
          </div>
          {index < ingredients.length - 1 && <Separator />}
        </li>
      ))}
    </ul>
  );
}
