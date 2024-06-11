import { auth } from "@/auth";
import { fetchIngredients } from "@/lib/data";
import { Ingredient } from "@prisma/client";

export default async function IngredientList() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return <p>Please sign in to view your ingredients</p>;
  }

  const userId = session.user.id;

  const ingredients: Ingredient[] = await fetchIngredients(userId);

  return (
    <ul>
      {ingredients.map((ingredient) => (
        <li key={ingredient.id}>
          {ingredient.name}
          {ingredient.calories}
        </li>
      ))}
    </ul>
  );
}
