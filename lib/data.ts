"use server";
import prisma from "./db";

export async function fetchIngredients(userId: string) {
  try {
    return await prisma.ingredient.findMany({
      where: { userId },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch ingredients");
  }
}

export async function fetchCaloriesGoal(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { caloriesGoal: true },
  });
  return user?.caloriesGoal ?? 2000;
}

export async function fetchFoodEaten(userId: string) {
  const foodEaten = await prisma.foodEaten.findMany({
    where: { userId },
    include: { ingredient: true },
    orderBy: { date: "desc" },
  });

  return foodEaten;
}
