-- AddForeignKey
ALTER TABLE "scholarships" ADD CONSTRAINT "scholarships_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "streams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
