import { auth } from "@/auth";
import CaloRing from "@/components/calo-ring";
import Cookbook from "@/components/cookbook";
import { IngredientsProvider } from "@/context/ingredient-context";
import { fetchIngredients } from "@/lib/data";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user?.id) {
    return <p>Please sign in to view your ingredients</p>;
  }

  const userId = session.user.id;
  const ingredients = await fetchIngredients(userId);

  return (
    <>
      <CaloRing />
      <IngredientsProvider ingredients={ingredients}>
        <Cookbook />
      </IngredientsProvider>
    </>
  );
}
