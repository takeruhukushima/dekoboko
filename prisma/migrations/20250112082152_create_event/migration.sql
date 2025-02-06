-- CreateTable
CREATE TABLE "Event" (
    "rkey" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "achievement" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "record" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("rkey")
);
