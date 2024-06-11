"use server";

import { IngredientFormData } from "@/components/ingredient-form";
import prisma from "./db";
import { revalidatePath } from "next/cache";

export async function createIngredient(
  data: IngredientFormData,
  userId: string,
) {
  const calories = data.fat * 9 + data.carb * 4 + data.protein * 4;

  await prisma.ingredient.create({
    data: {
      ...data,
      calories,
      user: { connect: { id: userId } },
    },
  });

  revalidatePath("/");
}
