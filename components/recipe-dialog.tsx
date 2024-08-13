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
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";
import { useEffect, useState } from "react";
import RecipeNameForm, { RecipeNameFormData } from "./recipe-name-form";
import RecipeBuilderForm from "./recipe-builder-form";

export default function RecipeDialog() {
  const [api, setApi] = useState<CarouselApi>();
  const [formData, setFormData] = useState<RecipeNameFormData | null>(null);
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

  function handleFormSubmit(data: RecipeNameFormData) {
    setFormData(data);
    handleSlideNavigation("next");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mr-1 w-20">Cook</Button>
      </DialogTrigger>
      <DialogContent className="h-[95svh] max-h-[40rem] min-h-[30rem] w-[95vw] max-w-[27rem] overflow-hidden rounded-lg">
        <Carousel
          setApi={setApi}
          opts={{ watchDrag: false }}
          className="min-w-0 overflow-hidden"
        >
          <CarouselContent className="h-full">
            <CarouselItem>
              <DialogHeader className="px-1 text-left">
                <DialogTitle>Create Recipe</DialogTitle>
                <DialogDescription>
                  Give a name to your recipe.
                </DialogDescription>
              </DialogHeader>
              <RecipeNameForm
                disabled={current !== 1}
                handleFormSubmit={handleFormSubmit}
              />
            </CarouselItem>
            <CarouselItem className="gap-4 flex flex-col">
              <DialogHeader className="px-1 text-left">
                <DialogTitle>Add Ingredients</DialogTitle>
                <DialogDescription>
                  Add ingredients to {formData?.name}
                </DialogDescription>
              </DialogHeader>
              <RecipeBuilderForm
                disabled={current !== 2}
                handleSlideNavigation={handleSlideNavigation}
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
