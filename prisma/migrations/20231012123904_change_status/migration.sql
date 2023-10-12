/*
  Warnings:

  - The values [Complete] on the enum `DonorRequestStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DonorRequestStatus_new" AS ENUM ('Pending', 'Accepted', 'Completed', 'Cancel');
ALTER TABLE "donor_request" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "donor_request" ALTER COLUMN "status" TYPE "DonorRequestStatus_new" USING ("status"::text::"DonorRequestStatus_new");
ALTER TYPE "DonorRequestStatus" RENAME TO "DonorRequestStatus_old";
ALTER TYPE "DonorRequestStatus_new" RENAME TO "DonorRequestStatus";
DROP TYPE "DonorRequestStatus_old";
ALTER TABLE "donor_request" ALTER COLUMN "status" SET DEFAULT 'Pending';
COMMIT;
