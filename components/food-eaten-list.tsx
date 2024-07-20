import { FoodEaten, Ingredient } from "@prisma/client";
import FoodEatenItem from "./food-eaten-item";
import FoodRemoveDialog from "./food-remove-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "./ui/separator";

export type FoodEatenWithIngredient = FoodEaten & {
  ingredient: Ingredient;
};

export default function FoodEatenList({
  foodEaten,
  disabled,
  handleFoodClick,
}: {
  foodEaten: FoodEatenWithIngredient[];
  disabled: boolean;
  handleFoodClick: (food: FoodEatenWithIngredient) => void;
}) {
  return (
    <ScrollArea>
      <fieldset disabled={disabled}>
        <ul>
          {foodEaten.map((food, index) => (
            <li key={food.id} className="relative">
              <div className="flex items-center">
                <FoodEatenItem
                  food={food}
                  handleFoodClick={handleFoodClick}
                />
                <FoodRemoveDialog id={food.id} name={food.ingredient.name} />
              </div>
              {index < foodEaten.length - 1 && <Separator />}
            </li>
          ))}
        </ul>
      </fieldset>
    </ScrollArea>
  );
}
