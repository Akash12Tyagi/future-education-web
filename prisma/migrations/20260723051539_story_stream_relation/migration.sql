-- AddForeignKey
ALTER TABLE "stories" ADD CONSTRAINT "stories_streamId_fkey" FOREIGN KEY ("streamId") REFERENCES "streams"("id") ON DELETE SET NULL ON UPDATE CASCADE;
