"use server";
import prisma from "./db";
import { revalidatePath } from "next/cache";
import { IngredientFormData } from "@/components/ingredient-form";

export async function createIngredient(
  data: IngredientFormData,
  userId: string,
) {
  const calories = data.fat * 9 + data.carb * 4 + data.protein * 4;
  try {
    await prisma.ingredient.create({
      data: {
        ...data,
        calories,
        user: { connect: { id: userId } },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Ingredient.");
  }
  revalidatePath("/");
}

export async function deleteIngredient(id: string) {
  try {
    await prisma.ingredient.delete({ where: { id } });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete Ingredient");
  }
}

export async function updateIngredient(data: IngredientFormData, id: string) {
  const calories = data.fat * 9 + data.carb * 4 + data.protein * 4;
  try {
    await prisma.ingredient.update({
      where: { id },
      data: {
        ...data,
        calories,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update ingredient");
  }
}

export async function updateCaloriesGoal(userId: string, caloriesGoal: number) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { caloriesGoal },
    });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update goal calories.");
  }
}

export async function eatFood(
  userId: string,
  ingredientId: string,
  serving: number,
) {
  const foodEaten = await prisma.foodEaten.create({
    data: {
      userId,
      ingredientId,
      serving,
      date: new Date(),
    },
  });
  revalidatePath("/");

  return foodEaten;
}

export async function removeFoodEaten(id: string) {
  try {
    await prisma.foodEaten.delete({ where: { id } });
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to remove food item.");
  }
}
