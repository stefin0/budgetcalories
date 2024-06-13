import IngredientDialog from "./ingredient-dialog";
import { RecipeDialog } from "./recipe-dialog";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IngredientList from "./ingredient-list";

export default async function Cookbook() {
  return (
    <>
      <Separator />
      <Tabs defaultValue="recipes" className="mx-auto max-w-2xl p-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recipes">Recipes</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
        </TabsList>
        <TabsContent value="recipes">
          <div className="flex gap-4">
            <Input placeholder="Search recipes" />
            <div className="grow">
              <RecipeDialog />
            </div>
          </div>
          <Separator className="mt-2" />
        </TabsContent>
        <TabsContent value="ingredients">
          <div className="flex gap-4">
            <Input placeholder="Search ingredients" />
            <div className="grow">
              <IngredientDialog />
            </div>
          </div>
          <Separator className="mt-2" />
          <IngredientList />
        </TabsContent>
      </Tabs>
    </>
  );
}
