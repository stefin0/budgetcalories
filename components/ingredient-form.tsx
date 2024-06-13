"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name cannot exceed 50 characters.",
    }),
  quantity: z.coerce
    .number()
    .min(0.125, {
      message: "Quantity must be at least 1/8.",
    })
    .max(9999, {
      message: "Quantity cannot exceed 9,999.",
    })
    .refine((value) => /^\d+(\.\d{1,3})?$/.test(value.toString()), {
      message: "Quantity cannot exceed 3 decimal places.",
    }),
  unit: z.string(),
  fat: z.coerce
    .number()
    .int()
    .min(0, {
      message: "Fat must be at least 0.",
    })
    .max(999, {
      message: "Fat cannot exceed 999.",
    }),
  carb: z.coerce
    .number()
    .int()
    .min(0, {
      message: "Carb must be at least 0.",
    })
    .max(999, {
      message: "Carb cannot exceed 999.",
    }),
  protein: z.coerce
    .number()
    .int()
    .min(0, {
      message: "Protein must be at least 0.",
    })
    .max(999, {
      message: "Protein cannot exceed 999.",
    }),
});

export type IngredientFormData = z.infer<typeof formSchema>;

export default function IngredientForm({
  disabled,
  handleFormSubmit,
  defaultValues,
  handleSlideNavigation,
}: {
  disabled: boolean;
  handleFormSubmit: (data: IngredientFormData) => void;
  defaultValues?: Partial<IngredientFormData>;
  handleSlideNavigation?: (navigation: string) => void;
}) {
  const form = useForm<IngredientFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unit: "",
      ...defaultValues,
    },
  });

  function onSubmit(values: IngredientFormData) {
    handleFormSubmit(values);
  }

  return (
    <Form {...form}>
      <fieldset disabled={disabled}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          className="mt-4 grid gap-4 px-1"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      inputMode="decimal"
                      step="0.001"
                      className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={() => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <FormControl>
                    <Controller
                      name="unit"
                      control={form.control}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Metric</SelectLabel>
                              <SelectItem value="g">g</SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>Imperial</SelectLabel>
                              <SelectItem value="oz">oz</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="fat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fat</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      inputMode="numeric"
                      className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="carb"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carb</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      inputMode="numeric"
                      className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="protein"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Protein</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      inputMode="numeric"
                      className="[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {defaultValues && handleSlideNavigation ? (
            <div className="mb-1 mt-4 grid grid-cols-2 gap-4">
              <Button
                onClick={() => handleSlideNavigation("prev")}
                type="button"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button type="submit">Next</Button>
            </div>
          ) : (
            <Button type="submit" className="mb-1 mt-4 w-full">
              Next
            </Button>
          )}
        </form>
      </fieldset>
    </Form>
  );
}
