import { Separator } from "./ui/separator";

export type NutritionFactsType = {
  name?: string;
  quantity?: number;
  unit?: string;
  fat: number;
  carb: number;
  protein: number;
  calories?: number;
};

export default function NutritionFacts({
  formData,
}: {
  formData: NutritionFactsType;
}) {
  const formatNumber = (num: number) =>
    num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);

  const calories = Math.ceil(
    formData.fat * 9 + formData.carb * 4 + formData.protein * 4,
  );

  return (
    <div className="mx-auto my-8 max-w-max border border-neutral-800 bg-white p-1 text-neutral-800">
      <p className="overflow-hidden text-nowrap text-2xl font-bold">
        Nutrition Facts
      </p>
      <Separator className="h-[2px] bg-neutral-800" />
      {formData.quantity !== 0 && (
        <div className="flex justify-between gap-2 text-xs font-bold">
          <p className="text-nowrap">Serving size</p>
          <div className="flex max-w-[11ch] gap-1 overflow-hidden">
            <p className="truncate">{formData.quantity}</p>
            <p className="truncate">
              {formData.unit ? formData.unit : formData.name}
            </p>
          </div>
        </div>
      )}
      <Separator className="h-[10px] bg-neutral-800" />
      <p className="flex items-baseline justify-between gap-2 overflow-hidden font-bold">
        <span>Calories</span>
        <span className="max-w-24 truncate text-2xl">{calories}</span>
      </p>
      <Separator className="h-[4px] bg-neutral-800" />
      <p className="flex gap-1 overflow-hidden text-xs">
        <span className="font-bold">Fat </span>
        <span className="max-w-20 truncate">{formatNumber(formData.fat)}g</span>
      </p>
      <Separator className="bg-neutral-800" />
      <p className="flex gap-1 overflow-hidden text-xs">
        <span className="font-bold">Carbohydrate </span>
        <span className="max-w-20 truncate">
          {formatNumber(formData.carb)}g
        </span>
      </p>
      <Separator className="bg-neutral-800" />
      <p className="flex gap-1 overflow-hidden text-xs">
        <span className="font-bold">Protein </span>
        <span className="max-w-20 truncate">
          {formatNumber(formData.protein)}g
        </span>
      </p>
    </div>
  );
}
