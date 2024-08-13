import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import IngredientList from "./ingredient-list";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

export default function RecipeBuilderForm({
  disabled,
  handleSlideNavigation,
}: {
  disabled: boolean;
  handleSlideNavigation: (navigation: string) => void;
}) {

  return (
    <>
      <Tabs defaultValue="ingredients" className="flex min-h-0 flex-col">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger disabled={disabled} value="ingredients">
            Ingredients
          </TabsTrigger>
          <TabsTrigger disabled={disabled} value="added">
            Added
          </TabsTrigger>
        </TabsList>
        <TabsContent
          className={`${disabled ? "invisible" : ""} flex min-h-0 flex-col data-[state=inactive]:mt-0`}
          value="ingredients"
        >
          <Input placeholder="Search Ingredients" />
          <Separator className="mt-2" />
          <ScrollArea>
            <IngredientList />
          </ScrollArea>
        </TabsContent>
        <TabsContent
          className={`${disabled ? "invisible" : ""} flex min-h-0 flex-col data-[state=inactive]:mt-0`}
          value="added"
        >
          <Input placeholder="Search Added" />
          <Separator className="mt-2" />
          <ScrollArea>
            <IngredientList />
          </ScrollArea>
        </TabsContent>
      </Tabs>
      <div className="mt-auto grid grid-cols-2 gap-4">
        <Button
          variant="secondary"
          onClick={() => handleSlideNavigation("prev")}
        >
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </>
  );
}
