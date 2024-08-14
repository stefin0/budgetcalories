import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import IngredientListBuilder from "./ingredient-list-builder";
import IngredientListAdded from "./ingredient-list-added";
import { useState } from "react";
import { Ingredient } from "@prisma/client";

export default function RecipeBuilderForm({
  disabled,
  handleSlideNavigation,
}: {
  disabled: boolean;
  handleSlideNavigation: (navigation: string) => void;
}) {
  const [ingredientsAdded, setIngredientsAdded] = useState<Ingredient[]>([]);

  function addIngredientToRecipe(ingredient: Ingredient) {
    setIngredientsAdded((prev) => [...prev, ingredient]);
  }

  function removeIngredientFromRecipe(id: string) {
    setIngredientsAdded((prev) =>
      prev.filter((ingredient) => ingredient.id !== id),
    );
  }

  return (
    <>
      <Tabs defaultValue="ingredients" className="flex min-h-0 flex-col px-1">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger disabled={disabled} value="ingredients">
            Ingredients
          </TabsTrigger>
          <TabsTrigger disabled={disabled} value="added">
            Added
          </TabsTrigger>
        </TabsList>
        <TabsContent
          className={`${disabled ? "invisible" : ""} flex min-h-0 flex-col data-[state=inactive]:mt-0`}
          value="ingredients"
        >
          <Input className="h-auto" placeholder="Search Ingredients" />
          <Separator className="mt-2" />
          <IngredientListBuilder
            addIngredientToRecipe={addIngredientToRecipe}
          />
        </TabsContent>
        <TabsContent
          className={`${disabled ? "invisible" : ""} flex min-h-0 flex-col data-[state=inactive]:mt-0`}
          value="added"
        >
          <Input className="h-auto" placeholder="Search Added" />
          <Separator className="mt-2" />
          <IngredientListAdded
            ingredientsAdded={ingredientsAdded}
            removeIngredientFromRecipe={removeIngredientFromRecipe}
          />
        </TabsContent>
      </Tabs>
      <div className="mt-auto grid grid-cols-2 gap-4 p-1">
        <Button
          disabled={disabled}
          variant="secondary"
          onClick={() => handleSlideNavigation("prev")}
        >
          Back
        </Button>
        <Button disabled={disabled} type="submit">
          Next
        </Button>
      </div>
    </>
  );
}
