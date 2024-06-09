import { IngredientFormData } from "./ingredient-form";
import { Separator } from "./ui/separator";

export default function NutritionFacts({ formData }: { formData: IngredientFormData }) {
  const calories = formData.fat * 9 + formData.carb * 4 + formData.protein * 4;

  return (
    <div className="mx-auto mb-8 max-w-max border border-neutral-800 bg-white p-1 text-neutral-800">
      <p className="text-2xl font-bold">Nutrition Facts</p>
      <Separator className="h-[10px] bg-neutral-800" />
      <p className="flex items-baseline justify-between font-bold">
        <span>Calories</span>
        <span className="text-2xl">{calories}</span>
      </p>
      <Separator className="h-[4px] bg-neutral-800" />
      <p className="text-xs">
        <span className="font-bold">Fat </span>
        <span>{formData.fat}g</span>
      </p>
      <Separator className="bg-neutral-800" />
      <p className="text-xs">
        <span className="font-bold">Carbohydrate </span>
        <span>{formData.carb}g</span>
      </p>
      <Separator className="bg-neutral-800" />
      <p className="text-xs">
        <span className="font-bold">Protein </span>
        <span>{formData.protein}g</span>
      </p>
    </div>
  );
}
