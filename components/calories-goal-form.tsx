import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  calories: z.coerce
    .number()
    .int()
    .min(1, {
      message: "Calories must be at least 1.",
    })
    .max(99999, { message: "Calories cannot exceed 99999" }),
});
export type CaloriesGoalFormData = z.infer<typeof formSchema>;

export default function CaloriesGoalForm({
  disabled,
  handleFormSubmit,
  handleSlideNavigation,
  caloriesGoal,
}: {
  disabled: boolean;
  handleFormSubmit: (data: CaloriesGoalFormData) => void;
  handleSlideNavigation?: (navigation: string) => void;
  caloriesGoal: number;
}) {
  const form = useForm<CaloriesGoalFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      calories: caloriesGoal,
    },
  });

  function onSubmit(values: CaloriesGoalFormData) {
    handleFormSubmit(values);
  }

  return (
    <Form {...form}>
      <fieldset disabled={disabled}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 gap-4 px-1"
        >
          <FormField
            control={form.control}
            name="calories"
            render={({ field }) => (
              <FormItem className="grid justify-center">
                <FormLabel className="justify-self-center">Calories</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    inputMode="numeric"
                    className="max-w-20 justify-self-center text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {handleSlideNavigation && (
            <div className="mb-1 mt-8 grid grid-cols-2 gap-4">
              <Button
                onClick={() => handleSlideNavigation("next")}
                type="button"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button type="submit">Update</Button>
            </div>
          )}
        </form>
      </fieldset>
    </Form>
  );
}
