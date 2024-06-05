import { IngredientFormData } from "./ingredient-form";
import NutritionFacts from "./nutrition-facts";
import { Button } from "./ui/button";
import { DialogClose, DialogFooter } from "./ui/dialog";

export default function IngredientReview({
  formData,
  handleSlideNavigation,
}: {
  formData: IngredientFormData | null;
  handleSlideNavigation: (navigation: string) => void;
}) {
  return (
    <div className="mt-8 px-1">
      {formData && <NutritionFacts formData={formData} />}
      <DialogFooter className="grid grid-cols-2 gap-4">
        <Button
          variant="secondary"
          onClick={() => handleSlideNavigation("prev")}
        >
          Back
        </Button>
        <DialogClose asChild>
          <Button type="submit">Create</Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}
