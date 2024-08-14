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
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(99999, { message: "Name cannot exceed 50 characters." }),
});
export type RecipeNameFormData = z.infer<typeof formSchema>;

export default function RecipeNameForm({
  disabled,
  handleFormSubmit,
}: {
  disabled: boolean;
  handleFormSubmit: (data: RecipeNameFormData) => void;
}) {
  const form = useForm<RecipeNameFormData>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: RecipeNameFormData) {
    handleFormSubmit(values);
  }

  return (
    <Form {...form}>
      <fieldset disabled={disabled}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-4 gap-4 px-1 pb-1"
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
          <Button type="submit" className="mt-8 w-full">Next</Button>
        </form>
      </fieldset>
    </Form>
  );
}
