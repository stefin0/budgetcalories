"use client";

import { createContext, ReactNode, useContext } from "react";
import { Ingredient } from "@prisma/client";

export const IngredientsContext = createContext<Ingredient[] | null>(null);

export function IngredientsProvider({ children, ingredients }: { children: ReactNode; ingredients: Ingredient[] }) {
  return (
    <IngredientsContext.Provider value={ingredients}>
      {children}
    </IngredientsContext.Provider>
  );
}

export function useIngredientsContext() {
  const context = useContext(IngredientsContext);
  if (!context) {
    throw new Error("useIngredientsContext must be used within an IngredientProvider");
  }
  return context;
}

