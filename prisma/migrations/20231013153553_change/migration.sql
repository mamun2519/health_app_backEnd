/*
  Warnings:

  - Made the column `meetingId` on table `meeting_request` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "meeting_request" DROP CONSTRAINT "meeting_request_meetingId_fkey";

-- AlterTable
ALTER TABLE "meeting_request" ALTER COLUMN "meetingId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "meeting_request" ADD CONSTRAINT "meeting_request_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "google-meet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
