/*
  Warnings:

  - Added the required column `rating` to the `doctor_service_review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctor_service_review" ADD COLUMN     "rating" INTEGER NOT NULL;
