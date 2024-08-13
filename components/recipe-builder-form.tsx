import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import IngredientList from "./ingredient-list";

export default function RecipeBuilderForm({
  disabled,
  handleSlideNavigation,
}: {
  disabled: boolean;
  handleSlideNavigation: (navigation: string) => void;
}) {
  function onSubmit(recipe) {
    handleFormSubmit(recipe);
  }

  return (
    <fieldset disabled={disabled}>
      <form className="p-1">
        <Tabs defaultValue="added" className="mx-auto max-w-2xl py-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger disabled={disabled} value="added">
              Added
            </TabsTrigger>
            <TabsTrigger disabled={disabled} value="ingredients">
              Ingredients
            </TabsTrigger>
          </TabsList>
          <TabsContent className={disabled ? "invisible" : ""} value="added">
            <Input placeholder="Search added" />
            <Separator className="mt-2" />
          </TabsContent>
          <TabsContent
            className={disabled ? "invisible" : ""}
            value="ingredients"
          >
            <Input placeholder="Search ingredients" />
            <Separator className="mt-2" />
            <IngredientList />
          </TabsContent>
        </Tabs>
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            onClick={() => handleSlideNavigation("prev")}
          >
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </fieldset>
  );
}
