/*
  Warnings:

  - Added the required column `bloodGroup` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "bloodGroup" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL;
