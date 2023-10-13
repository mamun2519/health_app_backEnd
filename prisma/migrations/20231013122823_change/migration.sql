/*
  Warnings:

  - The values [Cancle] on the enum `meetingEnumStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "meetingEnumStatus_new" AS ENUM ('Active', 'Complete', 'Expired', 'Cancel');
ALTER TABLE "google-meet" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "google-meet" ALTER COLUMN "status" TYPE "meetingEnumStatus_new" USING ("status"::text::"meetingEnumStatus_new");
ALTER TYPE "meetingEnumStatus" RENAME TO "meetingEnumStatus_old";
ALTER TYPE "meetingEnumStatus_new" RENAME TO "meetingEnumStatus";
DROP TYPE "meetingEnumStatus_old";
ALTER TABLE "google-meet" ALTER COLUMN "status" SET DEFAULT 'Active';
COMMIT;
