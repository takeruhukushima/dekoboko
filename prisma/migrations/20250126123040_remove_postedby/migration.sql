/*
  Warnings:

  - You are about to drop the column `postedBy` on the `Post` table. All the data in the column will be lost.
  - Added the required column `author` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "author" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "postedBy";
