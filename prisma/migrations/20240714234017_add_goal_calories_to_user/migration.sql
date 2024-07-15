/*
  Warnings:

  - You are about to alter the column `quantity` on the `Ingredient` table. The data in that column could be lost. The data in that column will be cast from `Decimal(7,3)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "quantity" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "caloriesGoal" INTEGER NOT NULL DEFAULT 2000;
