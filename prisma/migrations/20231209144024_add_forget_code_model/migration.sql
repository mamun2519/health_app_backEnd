-- CreateTable
CREATE TABLE "forget_code" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" INTEGER NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "forget_code_pkey" PRIMARY KEY ("id")
);
