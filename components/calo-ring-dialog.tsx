"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { Separator } from "./ui/separator";
import CaloriesGoalForm, { CaloriesGoalFormData } from "./calories-goal-form";
import FoodEatenList, { FoodEatenWithIngredient } from "./food-eaten-list";
import NutritionFacts, { NutritionFactsType } from "./nutrition-facts";
import { updateCaloriesGoal } from "@/lib/actions";

export default function CaloRingDialog({
  caloriesGoal,
  userId,
  foodEaten,
  totalNutritionalValues,
}: {
  caloriesGoal: number;
  userId?: string;
  foodEaten: FoodEatenWithIngredient[];
  totalNutritionalValues: NutritionFactsType;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [selectedFood, setSelectedFood] = useState<NutritionFactsType | null>(
    null,
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  function handleSlideNavigation(navigation: string) {
    if (navigation === "next") {
      api?.scrollNext();
    } else if (navigation === "prev") {
      api?.scrollPrev();
    }
  }

  async function handleFormSubmit(data: CaloriesGoalFormData) {
    if (userId) {
      await updateCaloriesGoal(userId, data.calories);
      handleSlideNavigation("next");
    } else {
      console.error("User ID is undefined. Please sign in.");
    }
  }

  function handleFoodClick(food: FoodEatenWithIngredient) {
    const formData: NutritionFactsType = {
      name: food.ingredient.name,
      quantity: food.ingredient.quantity * food.serving,
      unit: food.ingredient.unit,
      fat: food.ingredient.fat * food.serving,
      carb: food.ingredient.carb * food.serving,
      protein: food.ingredient.protein * food.serving,
    };
    setSelectedFood(formData);
    handleSlideNavigation("next");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="absolute aspect-square w-5/12 max-w-80 rounded-full bg-background transition-colors hover:bg-secondary"></button>
      </DialogTrigger>
      <DialogContent className="h-[95svh] max-h-[40rem] min-h-[30rem] w-[95vw] max-w-[27rem] overflow-hidden rounded-lg">
        <Carousel
          setApi={setApi}
          opts={{ watchDrag: false, startIndex: 1 }}
          className="min-w-0 overflow-hidden"
        >
          <CarouselContent className="max-h-full">
            <CarouselItem>
              <DialogHeader className="text-left">
                <DialogTitle>Edit Calories</DialogTitle>
                <DialogDescription>
                  How many calories do you want to eat per day?
                </DialogDescription>
              </DialogHeader>
              <CaloriesGoalForm
                disabled={current !== 1}
                handleFormSubmit={handleFormSubmit}
                handleSlideNavigation={handleSlideNavigation}
                caloriesGoal={caloriesGoal}
              />
            </CarouselItem>
            <CarouselItem className="flex flex-col">
              <DialogHeader className="text-left">
                <DialogTitle>Daily Calories</DialogTitle>
                <DialogDescription>View what you ate today.</DialogDescription>
              </DialogHeader>
              <fieldset disabled={current !== 2} className="mt-4 grid">
                <Button
                  variant="outline"
                  className="justify-self-center"
                  onClick={() => handleSlideNavigation("prev")}
                >
                  {totalNutritionalValues.calories}/{caloriesGoal}
                </Button>
                <NutritionFacts formData={totalNutritionalValues} />
                <Separator />
              </fieldset>
              <FoodEatenList
                foodEaten={foodEaten}
                handleFoodClick={handleFoodClick}
                disabled={current !== 2}
              />
            </CarouselItem>
            <CarouselItem>
              <DialogHeader className="px-1 text-left">
                <DialogTitle>
                  {selectedFood?.quantity} {selectedFood?.unit}{" "}
                  {selectedFood?.name}
                </DialogTitle>
                <DialogDescription>
                  Nutrition facts for {selectedFood?.quantity}{" "}
                  {selectedFood?.unit} {selectedFood?.name}
                </DialogDescription>
              </DialogHeader>
              {selectedFood && <NutritionFacts formData={selectedFood} />}
              <fieldset disabled={current !== 3} className="px-1">
                <Button
                  onClick={() => handleSlideNavigation("prev")}
                  variant="secondary"
                  className="w-full"
                >
                  Back
                </Button>
              </fieldset>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
