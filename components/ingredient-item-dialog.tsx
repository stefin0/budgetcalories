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

export default function IngredientItemDialog(props: Ingredient) {
  const [api, setApi] = useState<CarouselApi>();
  const [open, setOpen] = useState(false);

  function handleSlideNavigation(navigation: string) {
    if (navigation === "next") {
      api?.scrollNext();
    } else if (navigation === "prev") {
      api?.scrollPrev();
    }
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
        <Carousel setApi={setApi} opts={{ watchDrag: false }}>
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
              <div className="grid grid-cols-2 gap-4">
                <IngredientDeleteDialog
                  id={id}
                  quantity={quantity}
                  unit={unit}
                  name={name}
                  setOpen={setOpen}
                />
                <Button variant="secondary">Edit</Button>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
