/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Event";

-- CreateTable
CREATE TABLE "Quest" (
    "rkey" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "achievement" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "did" TEXT NOT NULL,
    "record" TEXT NOT NULL,

    CONSTRAINT "Quest_pkey" PRIMARY KEY ("rkey")
);
