-- DropForeignKey
ALTER TABLE "meeting_request" DROP CONSTRAINT "meeting_request_meetingId_fkey";

-- AlterTable
ALTER TABLE "meeting_request" ALTER COLUMN "meetingId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "meeting_request" ADD CONSTRAINT "meeting_request_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "google-meet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
