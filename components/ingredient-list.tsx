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
    <ul className="mt-2">
      <Separator />
      {ingredients.map((ingredient) => (
        <li key={ingredient.id} className="relative" >
          <div className="items-center flex">
            <IngredientItemDialog {...ingredient}/>
            <IngredientEatDialog />
          </div>
          <Separator />
        </li>
      ))}
    </ul>
  );
}
