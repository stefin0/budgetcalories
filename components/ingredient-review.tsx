"use client";

import { IngredientFormData } from "./ingredient-form";
import NutritionFacts from "./nutrition-facts";
import { Button } from "./ui/button";
import { DialogClose, DialogFooter } from "./ui/dialog";
import { createIngredient } from "@/lib/actions";
import { useSession } from "next-auth/react";

export default function IngredientReview({
  formData,
  handleSlideNavigation,
}: {
  formData: IngredientFormData | null;
  handleSlideNavigation: (navigation: string) => void;
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
          <Button type="submit" onClick={handleCreate}>
            Create
          </Button>
        </DialogClose>
      </DialogFooter>
    </div>
  );
}
