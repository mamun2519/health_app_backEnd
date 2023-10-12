/*
  Warnings:

  - Added the required column `rating` to the `donor_review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "donor_review" ADD COLUMN     "rating" INTEGER NOT NULL;
