/*
  Warnings:

  - Made the column `serviceId` on table `doctor_service_offer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "doctor_service_offer" DROP CONSTRAINT "doctor_service_offer_serviceId_fkey";

-- DropIndex
DROP INDEX "doctor_service_offer_serviceId_key";

-- AlterTable
ALTER TABLE "doctor_service_offer" ALTER COLUMN "serviceId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "doctor_service_offer" ADD CONSTRAINT "doctor_service_offer_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "doctor_service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
