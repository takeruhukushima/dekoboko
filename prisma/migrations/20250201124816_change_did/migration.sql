/*
  Warnings:

  - You are about to drop the column `author` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `Post` table. All the data in the column will be lost.
  - Added the required column `did` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `did` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "author",
ADD COLUMN     "did" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "author",
ADD COLUMN     "did" TEXT NOT NULL;
