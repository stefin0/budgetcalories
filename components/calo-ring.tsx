import { auth } from "@/auth";
import CaloRingDialog from "./calo-ring-dialog";
import { FoodEatenWithIngredient } from "./food-eaten-list";
import { fetchCaloriesGoal, fetchFoodEaten } from "@/lib/data";

export default async function CaloRing() {
  const session = await auth();
  let caloriesGoal = 2000;
  let userId: string | undefined;
  let foodEaten: FoodEatenWithIngredient[] = [];

  if (session && session.user?.id) {
    userId = session.user.id;
    caloriesGoal = (await fetchCaloriesGoal(userId)) || caloriesGoal;
    foodEaten = await fetchFoodEaten(userId);
  }

  const totalNutritionalValues = foodEaten.reduce(
    (totals, food) => {
      totals.fat += food.ingredient.fat * food.serving;
      totals.carb += food.ingredient.carb * food.serving;
      totals.protein += food.ingredient.protein * food.serving;
      totals.calories += food.ingredient.calories * food.serving;
      return totals;
    },
    {
      name: "",
      quantity: 0,
      unit: "",
      fat: 0,
      carb: 0,
      protein: 0,
      calories: 0,
    },
  );

  const caloriesEaten = totalNutritionalValues.calories;
  const caloriesRatio = (caloriesEaten / caloriesGoal) * 100;

  return (
    <div
      className="mx-auto my-4 flex aspect-square w-1/2 max-w-96 items-center justify-center rounded-full bg-border"
      style={{
        background: `conic-gradient(hsl(var(--primary)) ${caloriesRatio * 3.6}deg, hsl(var(--border)) 0deg)`,
      }}
    >
      <CaloRingDialog
        caloriesGoal={caloriesGoal}
        userId={userId}
        foodEaten={foodEaten}
        totalNutritionalValues={totalNutritionalValues}
      />
      <p
        className="relative font-bold"
        style={{
          fontSize: "clamp(1rem, 5vw, 2rem)",
        }}
      >
        {caloriesEaten}/{caloriesGoal}
      </p>
    </div>
  );
}
