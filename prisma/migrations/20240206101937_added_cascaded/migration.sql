-- DropForeignKey
ALTER TABLE "TodoTags" DROP CONSTRAINT "TodoTags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "TodoTags" DROP CONSTRAINT "TodoTags_todoId_fkey";

-- AddForeignKey
ALTER TABLE "TodoTags" ADD CONSTRAINT "TodoTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TodoTags" ADD CONSTRAINT "TodoTags_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
