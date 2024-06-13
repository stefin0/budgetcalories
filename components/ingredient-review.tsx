"use client";

import { IngredientFormData } from "./ingredient-form";
import NutritionFacts from "./nutrition-facts";
import { Button } from "./ui/button";
import { DialogClose, DialogFooter } from "./ui/dialog";
import { createIngredient, updateIngredient } from "@/lib/actions";
import { useSession } from "next-auth/react";

export default function IngredientReview({
  formData,
  handleSlideNavigation,
  ingredientId,
}: {
  formData: IngredientFormData | null;
  handleSlideNavigation: (navigation: string) => void;
  ingredientId?: string;
}) {
  const { data: session } = useSession();

  async function handleCreate() {
    if (!session || !session?.user || !formData) {
      console.error("User not authenticated");
      return;
    }
    const userId = session?.user?.id;
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }
    await createIngredient(formData, userId);
  }

  async function handleUpdate() {
    if (!session || !session?.user || !formData) {
      console.error("User not authenticated");
      return;
    }
    if (!ingredientId) {
      console.error("Invalid Ingredient");
      return;
    }
    await updateIngredient(formData, ingredientId);
  }

  return (
    <div className="px-1">
      {formData && <NutritionFacts formData={formData} />}
      <DialogFooter className="grid grid-cols-2 gap-4">
        <Button
          variant="secondary"
          onClick={() => handleSlideNavigation("prev")}
        >
          Back
        </Button>
        <DialogClose asChild>
          {ingredientId ? (
            <Button type="submit" onClick={handleUpdate}>
              Update
            </Button>
          ) : (
            <Button type="submit" onClick={handleCreate}>
              Create
            </Button>
          )}
        </DialogClose>
      </DialogFooter>
    </div>
  );
}
