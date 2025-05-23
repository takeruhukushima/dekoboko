/*
  Warnings:

  - You are about to drop the column `text` on the `Quest` table. All the data in the column will be lost.
  - Added the required column `title` to the `Quest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quest" DROP COLUMN "text",
ADD COLUMN     "title" TEXT NOT NULL;
