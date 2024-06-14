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
import IngredientForm, { IngredientFormData } from "./ingredient-form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import IngredientReview from "./ingredient-review";

export default function IngredientDialog() {
  const [api, setApi] = useState<CarouselApi>();
  const [formData, setFormData] = useState<IngredientFormData | null>(null);
  const [current, setCurrent] = useState(0);

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

  function handleFormSubmit(data: IngredientFormData) {
    setFormData(data);
    handleSlideNavigation("next");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-1 w-20">Cook</Button>
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
                <DialogTitle>Create Ingredient</DialogTitle>
                <DialogDescription>
                  Give information for your ingredient.
                </DialogDescription>
              </DialogHeader>
              <IngredientForm
                disabled={current !== 1}
                handleFormSubmit={handleFormSubmit}
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
                disabled={current !== 2}
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
