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
import IngredientForm from "./ingredient-form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState } from "react";

export default function IngredientDialog() {
  const [api, setApi] = useState<CarouselApi>();

  function handleNextSlide() {
    api?.scrollNext();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Cook</Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[425px] rounded-lg">
        <Carousel setApi={setApi} opts={{ watchDrag: false }}>
          <CarouselContent>
            <CarouselItem>
              <DialogHeader className="px-1 text-left">
                <DialogTitle>Create Ingredient</DialogTitle>
                <DialogDescription>
                  Give information for your ingredient.
                </DialogDescription>
              </DialogHeader>
              <IngredientForm handleNextSlide={handleNextSlide} />
            </CarouselItem>
            <CarouselItem>
              <DialogHeader className="text-left">
                <DialogTitle>Review</DialogTitle>
                <DialogDescription>
                  Nutrition facts for 1 cup Milk.
                </DialogDescription>
              </DialogHeader>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
