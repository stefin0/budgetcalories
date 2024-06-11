import prisma from "./db";

export async function fetchIngredients(userId: string) {
  return await prisma.ingredient.findMany({
    where: { userId },
  })
}
