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
import CaloriesGoalForm from "./calories-goal-form";

export default function CaloRingDialog({
  caloriesGoal,
}: {
  caloriesGoal: number;
}) {
  const [api, setApi] = useState<CarouselApi>();
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

  function handleFormSubmit(data: number) {
    console.log(data);
    handleSlideNavigation("next");
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="absolute aspect-square w-5/12 max-w-80 rounded-full bg-background transition-colors hover:bg-secondary"></button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[27rem] rounded-lg">
        <Carousel
          setApi={setApi}
          opts={{ watchDrag: false, startIndex: 1 }}
          className="min-w-0"
        >
          <CarouselContent>
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
            <CarouselItem>
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
                  500/{caloriesGoal}
                </Button>
              </fieldset>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
