"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Ingredient } from "@prisma/client";
import NutritionFacts from "./nutrition-facts";
import { useState } from "react";

const formSchema = z.object({
  serving: z.coerce
    .number()
    .min(0.001, { message: "Serving must be at least 0.001." })
    .max(9999, { message: "Serving cannot exceed 9999." }),
});

export default function IngredientEatDialog(props: Ingredient) {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serving: 1,
    },
  });

  const serving = useWatch({ control: form.control, name: "serving" });
  const updatedFormData = {
    ...props,
    quantity: props.quantity * serving,
    fat: props.fat * serving,
    carb: props.carb * serving,
    protein: props.protein * serving,
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="absolute right-0 mr-1 w-20">
          Eat
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[27rem] gap-0 rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle>Eat</DialogTitle>
          <DialogDescription>How much do you want to eat?</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => setOpen(false))}
            className="mt-4 space-y-8"
          >
            <FormField
              control={form.control}
              name="serving"
              render={({ field }) => (
                <FormItem className="grid justify-center">
                  <FormLabel className="justify-self-center">Serving</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      className="max-w-16 justify-self-center text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <NutritionFacts formData={updatedFormData} />
            <DialogFooter>
              <Button type="submit" className="w-full">
                Eat
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
