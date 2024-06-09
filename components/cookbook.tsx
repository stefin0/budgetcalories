import IngredientDialog from "./ingredient-dialog";
import { RecipeDialog } from "./recipe-dialog";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Cookbook() {
  return (
    <>
      <Separator />
      <Tabs defaultValue="recipes" className="m-4" >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recipes">Recipes</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
        </TabsList>
        <TabsContent value="recipes">
          <div className="flex gap-4">
            <Input placeholder="Search recipes" />
            <RecipeDialog />
          </div>
        </TabsContent>
        <TabsContent value="ingredients">
          <div className="flex gap-4">
            <Input placeholder="Search ingredients" />
            <IngredientDialog />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
