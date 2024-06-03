export default function IngrF1() {
  return (
    <>
      <DialogHeader className="text-left">
        <DialogTitle>Create Ingredient</DialogTitle>
        <DialogDescription>
          Give information for your ingredient.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-1">
        <IngredientForm />
      </div>
    </>
  );
}
