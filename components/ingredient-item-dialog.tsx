"use client";

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
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState } from "react";

import NutritionFacts from "./nutrition-facts";
import { Ingredient } from "@prisma/client";
import IngredientDeleteDialog from "./ingredient-delete-dialog";
import IngredientForm, { IngredientFormData } from "./ingredient-form";
import IngredientReview from "./ingredient-review";

export default function IngredientItemDialog(props: Ingredient) {
  const [api, setApi] = useState<CarouselApi>();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<IngredientFormData | null>(null);

  function handleSlideNavigation(navigation: string) {
    if (navigation === "next") {
      api?.scrollNext();
    } else if (navigation === "prev") {
      api?.scrollPrev();
    }
  }

  function handleFormSubmit(data: IngredientFormData) {
    setFormData(data);
    handleSlideNavigation("next");
  }

  const { id, name, quantity, unit, calories } = props;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-full p-1 text-left transition-colors hover:bg-secondary/50">
          <div className="flex w-2/3 items-baseline gap-1">
            <p className="truncate">{name}</p>
            <p className="text-xs text-muted-foreground">{quantity}</p>
            <p className="text-xs text-muted-foreground">{unit}</p>
          </div>
          <p className="text-sm text-muted-foreground">{calories} Cal.</p>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[425px] rounded-lg">
        <Carousel
          setApi={setApi}
          opts={{ watchDrag: false }}
          className="min-w-0"
        >
          <CarouselContent>
            <CarouselItem>
              <DialogHeader className="px-1 text-left">
                <DialogTitle>
                  {quantity} {unit} <span className="break-all">{name}</span>
                </DialogTitle>
                <DialogDescription>
                  Nutrition facts for {quantity} {unit}{" "}
                  <span className="break-all">{name}</span>
                </DialogDescription>
              </DialogHeader>
              <NutritionFacts formData={props} />
              <div className="grid grid-cols-2 gap-4 px-1">
                <IngredientDeleteDialog
                  id={id}
                  quantity={quantity}
                  unit={unit}
                  name={name}
                  setOpen={setOpen}
                />
                <Button
                  onClick={() => handleSlideNavigation("next")}
                  variant="secondary"
                >
                  Edit
                </Button>
              </div>
            </CarouselItem>
            <CarouselItem>
              <DialogHeader className="px-1 text-left">
                <DialogTitle>Edit Ingredient</DialogTitle>
                <DialogDescription>
                  Edit information for your ingredient
                </DialogDescription>
              </DialogHeader>
              <IngredientForm
                handleFormSubmit={handleFormSubmit}
                defaultValues={props}
                handleSlideNavigation={handleSlideNavigation}
              />
            </CarouselItem>
            <CarouselItem>
              <DialogHeader className="text-left">
                <DialogTitle>Review</DialogTitle>
                {formData && (
                  <DialogDescription>
                    Nutrition facts for {formData.quantity} {formData.unit}{" "}
                    <span className="break-all">{formData.name}</span>
                  </DialogDescription>
                )}
              </DialogHeader>
              <IngredientReview
                formData={formData}
                handleSlideNavigation={handleSlideNavigation}
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
