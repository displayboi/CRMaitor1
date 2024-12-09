/*
  Warnings:

  - Added the required column `telefono` to the `citas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `citas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "citas" ADD COLUMN     "telefono" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "citas" ADD CONSTRAINT "citas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
