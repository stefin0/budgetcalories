import { FoodEatenWithIngredient } from "./food-eaten-list";

export default function FoodEatenItem({
  food,
  handleFoodClick,
}: {
  food: FoodEatenWithIngredient;
  handleFoodClick: (food: FoodEatenWithIngredient) => void;
}) {
  const totalCalories = food.ingredient.calories * food.serving;
  const quantity = food.ingredient.quantity * food.serving;

  return (
    <button
      onClick={() => handleFoodClick(food)}
      className="w-full p-1 text-left transition-colors hover:bg-secondary/50"
    >
      <div className="flex w-2/3 items-baseline gap-1">
        <p className="truncate">{food.ingredient.name}</p>
        <p className="text-xs text-muted-foreground">{quantity}</p>
        <p className="text-xs text-muted-foreground">{food.ingredient.unit}</p>
      </div>
      <p className="text-sm text-muted-foreground">{totalCalories} Cal.</p>
    </button>
  );
}
